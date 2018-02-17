const _ = require('lodash');

const token = document.head.querySelector('meta[name="csrf-token"]');

import VueDropzone from '../Vue/VueDropzone'

export default {
    components: {
        'vue-dropzone': VueDropzone
    },

    props: {
        // Used for v-bind
        value: {
            type: [ Object, Array ],
        },

        // the label for the form element
        label: {
            type: String,
            required: true
        },

        // The type of model
        type: {
            type: String,
            required: true
        },

        // The id of the model
        id: {
            type: Number,
        },

        // The model property the image should be attached to
        property: {
            type: String,
        },

        private: {
            type: Boolean,
            default: false,
        },

        headers: {
            type: Object,
            required: false
        },

        // Supported file types
        fileTypes: {
            type: [String, Array],
            default: 'image/*'
        },

        // If multiple files are allowed, how many
        limit: {
            type: Number,
            default: 1
        },

        // Max File size in MB
        maxFileSize: {
            type: Number,
            default: 10
        },

        helpText: {
            type: String,
            required: false
        },

        // Error callback
        error: {
            type: Function
        },
    },

    data () {
        return {
            base: "/api/admin/upload",
            errors: [],
            progress: 0,
        }
    },

    computed: {
        requestHeaders() {
            return this.headers || _.get(this.$vfconfig, 'headers', {})
        },

        acceptedFiletypes() {
            if(_.isString(this.fileTypes)) {
                return this.fileTypes
            }

            if(_.isArray(this.fileTypes)) {
                return this.fileTypes.join(',')
            }
        },

        endpoint() {
            const base = this.base || _.get(this.$vfconfig, 'endpoints.upload');

            var endpoint = base + "?type=" +this.type;

            if (this.id) {
                endpoint += "&model=" + this.id;
            }

            if (this.property) {
                endpoint += "&property=" + this.property;
            }

            return endpoint;
        },


        fileList () {
            if (this.value instanceof Array) {
                return this.value;
            }

            else if (this.value instanceof Object) {
                return [ this.value ];
            }
        },

        impliedArray() {
            return Boolean(this.limit > 1 || this.value instanceof Array);
        },

        limitText() {
            return "" + this.limit + " file" + ((this.limit > 1) ? 's':'');
        }
    },

    methods: {
        _reloadListeners() {
            $('.dz-details').on('click', (target)=>{

            })
        },

        _error (response) {
            console.error('FormDropzone Error:', response);
            this.progress = 0;
            if(this.$alerter) {
                this.$alerter.errorResponse(response);
            }

            if(this.error) {
                this.error(response);
            }
        },

        dzError (file, response) {
            this._error(response);
        },

        dzAdded (file) {
            this.progress = 0;
            if(this.impliedArray) {
                var files = this.value || [];
                files.push(file);
                return this.$emit('input', files);
            }

            this.$emit('input', file);
            this.$emit('added', file);
        },

        dzRemoved (file) {
            var success = (response) => {
                this.progress = 0;
                var files = null
                if(this.impliedArray) {
                    files = _.filter(this.value, (f)=>{
                        return f.id != file.id
                    });
                }
                this.$emit('input', files);
                this.$emit('removed', file);
                console.log("Successfully removed "+file.name);
            };

            var error = (response) => {
                this._error(response)
            };

            if (file.id) {
                var endpoint = this.base + "/" + file.id;
                this.$http.delete(endpoint).then(success, error);
            }
        },
    }
}
