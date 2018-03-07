import _ from 'lodash'

import VueDropzone from '../vue/VueDropzone'

export default {
    components: {
        'vue-dropzone': VueDropzone
    },

    props: {
        // Used for v-bind
        value: {
            type: [Object, Array],
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
    },

    data() {
        return {
            error: null,
            progress: 0,
        }
    },

    computed: {
        dzHelpText() {
            return `Limited to ${this.limitText}. ${this.eachText} must not exceed ${this.maxFileSize}MB.`
        },

        requestHeaders() {
            return this.headers || _.get(this.$vfconfig, 'headers', {})
        },

        acceptedFileTypes() {
            if (_.isString(this.fileTypes)) {
                return this.fileTypes
            }

            if (_.isArray(this.fileTypes)) {
                return this.fileTypes.join(',')
            }
        },

        requestEndpoint() {
            const base = this.endpoint || _.get(this.$vfconfig, 'endpoints.upload');

            var endpoint = base + "?type=" + this.type;

            if (this.id) {
                endpoint += "&model=" + this.id;
            }

            if (this.property) {
                endpoint += "&property=" + this.property;
            }

            return endpoint;
        },

        fileList() {
            if (this.value instanceof Array) {
                return this.value;
            } else if (this.value instanceof Object) {
                return [this.value];
            }
        },

        impliedArray() {
            return Boolean(this.limit > 1 || this.value instanceof Array);
        },

        eachText() {
            return this.limit > 1 ? "Each file" : "The file"
        },

        limitText() {
            return "" + this.limit + " file" + ((this.limit > 1) ? 's' : '');
        }
    },

    methods: {
        dzError(file, response, xhr) {
            console.error('FormDropzone Error:', response, xhr);
            this.error = response

            this.progress = 0;
            if (this.$vfalert && _.isFunction(this.$vfalert.errorResponse)) {
                this.$vfalert.errorResponse(response, 'There was a problem with with Dropzone', xhr);
            }

            this.$emit('error', response);
        },

        dzAdded(file) {
            this.progress = 0;
            if (this.impliedArray) {
                var files = this.value || [];
                files.push(file);
                return this.$emit('input', files);
            }

            this.$emit('input', file);
            this.$emit('added', file);
        },

        dzRemoved(file) {
            this.progress = 0;

            var success = (response) => {
                var files = null
                if (this.impliedArray) {
                    files = _.filter(this.value, (f) => {
                        return f.id != file.id
                    });
                }
                this.$emit('input', files);
                this.$emit('removed', file);
                console.log("Successfully removed " + file.name);
            };

            var error = (response) => {
                this.error = response
                this.$emit('error', response);
            };

            if (file.id) {
                const base = this.endpoint || _.get(this.$vfconfig, 'endpoints.upload');
                if (_.isEmpty(base)) {
                    console.error("[FORM DROPZONE] No base path set.")
                    return;
                }

                var endpoint = `${base}/${file.id}`
                this.$http.delete(endpoint).then(success, error);
            }
        },
    }
}
