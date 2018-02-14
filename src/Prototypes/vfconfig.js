import Vue from "Vue"

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
        }
    },

    computed: {

    },

    watch: {

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