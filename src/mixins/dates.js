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
        $_makeFormattedDate(aMoment) {
            if (!aMoment || !aMoment.isValid()) return null;

            if (this.timePicker) {
                return aMoment.format(this.dateValueFormat)
            }
            return aMoment.utc().startOf('day').format(this.dateValueFormat)
        },

        updateStart(aMoment) {
            if (aMoment.isValid()) {
                if ( ! this.timePicker) {
                    aMoment = aMoment.utc().startOf('day')
                }
                this.picker.setStartDate(aMoment);
            }
        },

        updateEnd(aMoment) {
            if (aMoment.isValid()) {
                if ( ! this.timePicker) {
                    aMoment = aMoment.utc().startOf('day')
                }
                this.picker.setEndDate(aMoment);
            }
        },

        safeDate(string) {
            var date = moment(string);
            if (date.isValid()) {
                return date;
            }
            return moment({});
        },

    },

    computed: {
        pickerLocaleFormat() {
            var format = (_.get(this.$vfconfig, 'format.date') || 'MM/DD/YYYY')
            if(this.timePicker) {
                format += ` ${_.get(this.$vfconfig, 'format.time') || 'h:mm A' }`
            }
            return format
        },

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
