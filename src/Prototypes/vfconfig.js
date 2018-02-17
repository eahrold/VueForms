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
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualchars',
                'searchreplace visualblocks codemirror fullscreen textcolor contextmenu',
                'insertdatetime media table contextmenu paste imagetools'
            ],
            toolbar: `undo redo | insert  | bold italic | alignleft aligncenter alignright alignjustify |
                bullist numlist outdent indent | link image | styleselect fontselect fontsizeselect forecolor | visualblocks code`,
            css: ''
        },
    },

    computed: {
        fileTypes() {
            return mimeTypes
        }
    },

    methods: {
        configure(options) {
            const { headers, format, endpoints } = options
            if(headers) {
                this.headers = headers
            }

            this.format.date = _.get(format, 'date', DEFAULT_DATE_FORMAT)
            this.format.time = _.get(format, 'time', DEFAULT_TIME_FORMAT)

            this.endpoints.upload = _.get(endpoints, 'upload', null)
            this.endpoints.files = _.get(endpoints, 'files', null)
        }
    }
})