import { isObject, get, isArray } from 'lodash'

export default {
    props: {
        options: {
            type: [Array, Object],
            required: false
        },

        textKey: {
            type: String,
            default: 'text',
        },

        valueKey: {
            type: [String, Boolean],
            default: false,
        },
    },

    computed: {
        $_VF_OptionsMixin_optionsListIsObject() {
            return !isArray(this.options);
        }
    },

    methods: {
        optionDescription(opt) {
            if(isObject(opt)) {
                return opt[this.textKey]
            }
            return opt;
        },

        optionValue(opt, indexOrKey) {
            if(this.$_VF_OptionsMixin_optionsListIsObject) return indexOrKey;

            if(isObject(opt)) {
                return (this.valueKey !== false) ? opt[this.valueKey] : opt[this.textKey]
            }
            return opt;
        }
    }
};
