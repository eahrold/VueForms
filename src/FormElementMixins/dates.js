import moment from 'moment'

export default {
    props: {
        timepicker: {
            type: Boolean,
            default: false
        },

        dropdowns: {
            type: Boolean,
            default: false
        },

        autoApply: {
            type: Boolean,
            default: true
        },

        opens: {
            type: String,
            default: "center"
        }
    },

    methods: {
        safeDate (string) {
            var date = moment(string);
            if (date.isValid()) {
                return date;
            }
            return moment({});
        },

        updateStart (string) {
            var date = moment(string);
            if (date.isValid()) {
                this.picker.data('daterangepicker').setStartDate(date);
            }
        },

        updateEnd (string) {
            var date = moment(string);
            if (date.isValid()) {
                this.picker.data('daterangepicker').setEndDate(date);
            }
        }
    },

    computed : {
        params () {
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
