import _ from 'lodash'

export default {
    data() {
        return {
            touched: false,
            blurred: false,
            focused: false,
        }
    },

    computed : {
        formClass() {
            return [
                {
                    "has-error": this.hasError,
                    "has-warning": !this.isValid,
                }
            ];
        },

        typeErrors() {
            return _.get(this.errors, this.property, []);
        },

        hasError () {
            return Boolean(this.errors && this.typeErrors.length);
        },

        displayErrors() {
            return this.hasError || this.warning
        },

        warning () {
            const message = _.get(this, 'vfErrors')
            if(_.isString(message)){
                return message
            }
            return null
        },

    },

    methods: {
        onFocus() {
            this.focused = true
        },

        onBlur() {
            this.blurred = true
        }
    },

    watch: {
        blurred(newVal) {
            this.focused = !newVal
        },

        focused(newVal) {
            this.blurred = !newVal
        }
    }
};