import moment from 'moment'

export default {
    props: {

        dateConfig: {
            type: Object,
            default: () => { return {} }
        },

        dropdowns: {
            type: Boolean,
            default: false
        },

        opens: {
            type: String,
            default: "center"
        },

        autoApply: {
            type: Boolean,
            default: true
        },

        timePicker: {
            type: Boolean,
            default: false,
        },

        timePickerIncrement: {
            type: Number,
            default: 15
        },

        autoApply: {
            type: Boolean,
            default: true,
        },

        showRanges: {
            type: Boolean,
            default: true
        },

        valueFormat: {
            type: String,
            required: false,
        }
    },

    methods: {
        $_makeFormattedDate(moment) {
            if (!moment || !moment.isValid()) return null;

            if (this.timePicker) {
                return moment.format(this.dateValueFormat)
            }
            return moment.startOf('day').format(this.dateValueFormat)
        },

        safeDate(string) {
            var date = moment(string);
            if (date.isValid()) {
                return date;
            }
            return moment({});
        },

        updateStart(string) {
            var date = moment(string);
            if (date.isValid()) {
                this.picker.data('daterangepicker').setStartDate(date);
            }
        },

        updateEnd(string) {
            var date = moment(string);
            if (date.isValid()) {
                this.picker.data('daterangepicker').setEndDate(date);
            }
        }
    },

    computed: {
        dateValueFormat() {
            return this.valueFormat || _.get(this, '$vfconfig.format.dateValueFormat', null);
        },

        params() {
            var date = this.safeDate(this.value);
            return {
                "singleDatePicker": this.single || false,
                "autoApply": this.autoApply,
                "showDropdowns": this.dropdowns,
                "timePicker": this.timepicker,
                "startDate": date,
                "endDate": date,
                "opens": this.opens
            }
        }
    }
}
