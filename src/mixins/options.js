import { isObject, isArray } from 'lodash'

export default {
    props: {
        options: {
            type: [Array, Object],
            required: false
        },

        textKey: {
            type: String,
            default: 'text'
        },

        valueKey: {
            type: [String, Boolean],
            default: 'value'
        },

        useIndexAsValue: {
            type: Boolean,
            default: false
        },

        useKeyAsValue: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        $_VF_OptionsMixin_optionsListIsObject () {
            return !isArray(this.options)
        }
    },

    methods: {
        optionDescription (opt) {
            if (isObject(opt)) {
                return opt[this.textKey]
            }
            return opt
        },

        optionValue (opt, indexOrKey) {
            if (!this.$_VF_OptionsMixin_optionsListIsObject && this.useIndexAsValue) return indexOrKey

            if (this.useKeyAsValue === true) {
                return indexOrKey
            }

            if (isObject(opt) && (this.valueKey !== false)) {
                return opt[this.valueKey]
            }
            return opt
        }
    }
}
