import _ from 'lodash'

import vf_uid from './vf_uid'

export default {
    mixins: [ vf_uid ],
    props: {
        value: {
            required: true
        },

        placeholder: {
            type: [String, Number],
            default: ""
        },

        property: {
            type: String,
            required: true,
        },

        label: {
            type: [String, Boolean],
            default: ""
        },

        errors: {
            type: Object,
            required: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        required: {
            type: Boolean,
            default: false
        },

        rules: {
            type: [Array, Function, Boolean],
            default: (value) => {
                return true
            }
        },

        validation: {
            type: Object,
            required: false,
        }
    },

    data() {
        return {
            vfErrors: null
        }
    },

    mounted() {
        if (this.$_vf_validator) {
            this.$_vf_validator.register(this.property, this.isValidIgnoringTouch)
        }
    },

    destroyed() {
        if (this.$_vf_validator) {
            this.$_vf_validator.unregister(this.property)
        }
    },

    watch: {
        isValidIgnoringTouch(newVal) {
            if (this.$_vf_validator) {
                this.$_vf_validator.update(this.property, newVal)
            }
        },

        validated(newVal) {
            this.$_checkValidated(newVal)
        },

        blurred(newVal) {
            if (newVal === true) {
                this.$_checkValidated(this.validated)
            }
        }
    },

    methods: {
        $_checkValidated(validated) {
            if (_.isString(validated)) {
                this.vfErrors = validated;
            } else if (validated === true) {
                this.vfErrors = null
            }
        }
    },

    computed: {
        $_vf_validator() {
            return this.validation || this.$validation
        },

        validated() {
            if (this.required === false && _.isEmpty(this.value)) return true;

            if (this.required === true && _.isEmpty(this.value) && !_.isNumber(this.value)) {
                return `${_.startCase(this.property || "This field")} is required`
            }

            if (_.isBoolean(this.rules)) {
                return this.rules
            } else if (_.isFunction(this.rules)) {
                return this.rules(this.value)
            } else if (_.isArray(this.rules)) {
                for (var i = this.rules.length - 1; i >= 0; i--) {
                    const rule = this.rules[i]
                    const isFunction = _.isFunction(rule)
                    if (!isFunction) {
                        console.error("[VueForms Validation] Rules array must only contain functions.")
                        return false
                    }
                    let passes = rule(this.value)
                    if (passes !== true) {
                        return passes
                    }
                }
            }
            return true;
        },

        isValidIgnoringTouch() {
            return this.validated === true;
        },

        isValid() {
            if (!this.touched) return true;
            return this.isValidIgnoringTouch === true;
        },

        aLabel() {
            if (this.label === false) {
                return ""
            }

            return (this.label || _.startCase(this.property || '')) + (this.required ? "*" : "")
        }
    },
};
