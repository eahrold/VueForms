import _ from 'lodash'

export default {
    data() {
        return {
            touched: false
        }
    },

    computed : {
        formClass() {
            return [
                {
                    "has-error": this.hasError,
                    "has-warning": this.requiredIsMissing || !this.isValid,
                }
            ];
        },

        typeErrors() {
            return _.get(this.errors, this.property, []);
        },

        hasError () {
            return Boolean(this.errors && this.typeErrors.length);
        },

        requiredIsMissing() {
            return this.required && this.touched && _.isEmpty(this.value)
        }
    }
};