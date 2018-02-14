import _ from 'lodash'

export default {
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
    }
  },

  mounted() {
    if (this.$validation) {
      this.$validation.register(this.property, this.isValidIgnoringTouch)
    }
  },

  destroyed() {
    if (this.$validation) {
      this.$validation.unregister(this.property)
    }
  },

  watch: {
    isValidIgnoringTouch(newVal) {
      if (this.$validation) {
          this.$validation.update(this.property, newVal)
      }
    }
  },

  computed: {
    isValidIgnoringTouch() {
        if (this.required === true && _.isEmpty(this.value) && !_.isNumber(this.value)) {
            return false
        }

        if (_.isBoolean(this.rules)) {
            return this.rules
        } else if (_.isFunction(this.rules)) {
            return this.rules(this.value)
        } else if (_.isArray(this.rules)) {
            for (var i = this.rules.length - 1; i >= 0; i--) {
                const rule = this.rules[i]
                const isFunction = _.isFunction(rule)
                if(!isFunction) {
                  console.error("[VueForms Validation] Rules array must only contain functions.")
                  return false
                }
                if (rule(this.value) === false) {
                    return false
                }
            }
        }
        return true;
    },

    isValid() {
        if (!this.touched) return true;
        return this.isValidIgnoringTouch;
    },

    aLabel() {
      if (this.label === false) {
        return ""
      }

      return (this.label || _.startCase(this.property || '')) + (this.required ? "*" : "")
    }
  }
};
