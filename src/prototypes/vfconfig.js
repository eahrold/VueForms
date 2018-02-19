import Vue from "Vue"

import mimeTypes from '../DataSources/SupportedMimeTypes'

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY'
const DEFAULT_TIME_FORMAT = 'h:mm A'

export default new Vue({
    data: {
        headers: {},
        endpoints: {
            upload: null,
            files: null,
        },
        format: {
            date: DEFAULT_DATE_FORMAT,
            time: DEFAULT_TIME_FORMAT
        },

        dropzone: {
            maxFileSize: 10 // in MB
        },

        tinymce: {
            apiKey: null,
            config: {
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualchars',
                    'searchreplace visualblocks fullscreen textcolor contextmenu',
                    'insertdatetime media table contextmenu paste imagetools code'
                ],
                toolbar: `undo redo | insert code  | bold italic | alignleft aligncenter alignright alignjustify |
                    bullist numlist outdent indent | link image vf_image_picker | styleselect fontselect fontsizeselect forecolor | visualblocks code`,
                css: '',
                menubar: true,
            }
        },
    },

    computed: {
        fileTypes() {
            return mimeTypes
        },
    },

    methods: {
        filesEndpoint(key) {
            const files = _.get(this, 'endpoints.files');
            if (_.isObject(files)) {
                return _.get(files, key || 'default')
            } else if (_.isString(files)) {
                return files
            }
        },

        configure(options) {
            const { headers, format, endpoints, tinymce } = options
            if (headers) {
                this.headers = headers
            }

            if (tinymce) {
                console.log("Setting tinymce", tinymce)
                this.tinymce = _.assign({}, this.tinymce, tinymce)
            }

            this.format.date = _.get(format, 'date', DEFAULT_DATE_FORMAT)
            this.format.time = _.get(format, 'time', DEFAULT_TIME_FORMAT)

            this.endpoints.upload = _.get(endpoints, 'upload', null)
            this.endpoints.files = _.get(endpoints, 'files', null)
        }
    }
})
