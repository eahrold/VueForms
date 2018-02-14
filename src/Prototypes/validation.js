import Vue from "Vue"

const VALIDATION_EVENT_REGISTRY_CHANGED = 'VALIDATION_EVENT_REGISTRY_CHANGED'

export const ValidationEvents = {
    'STATUS_CHANGE' : VALIDATION_EVENT_REGISTRY_CHANGED,
}

export const ValidationSyncMixin = {
  mounted() {
    this.$validation.$on(VALIDATION_EVENT_REGISTRY_CHANGED, this.didUpdateValidationRegistry)
  },

  beforeDestory() {
    this.$validation.$off(VALIDATION_EVENT_REGISTRY_CHANGED, this.didUpdateValidationRegistry)
  },

  methods: {
      didUpdateValidationRegistry(registry) {
          this.$forceUpdate()
      }
  },
}

export default new Vue({
    data: {

        VueForms_validation_registry: {},

        VueForm_validation_internalRules: {
            required: function(value) {
                return !_.isEmpty(value)
            },

            email: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },

            url: function (value) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)
            }
        }
    },

    computed: {
        registry() {
            return this.VueForms_validation_registry
        },

        failing() {
            return _.omitBy(this.VueForms_validation_registry, (value, key)=>{
                return value !== false
            })
        },

        rules() {
            return this.VueForm_validation_internalRules
        },

        passes() {
            return _.isEmpty(this.failing)
        },

        fails() {
            return !this.passes
        }
    },

    watch: {
        VueForms_validation_registry: {
            deep: true,
            handler:function(newVal){
                this.$emit(VALIDATION_EVENT_REGISTRY_CHANGED, newVal)
            }
        },
    },

    methods: {
        clear() {
            this.VueForms_validation_registry = {}
        },

        update(key, status) {
            if(!_.has(this.VueForms_validation_registry, key)) {
                return this.register(key, status)
            }

            this.$set(this.VueForms_validation_registry, key, status)
        },

        register(key, status) {
            this.$set(this.VueForms_validation_registry, key, status)
        },

        unregister(key) {
            this.VueForms_validation_registry = _.omitBy(this.VueForms_validation_registry, (value, aKey)=>{
                return key === aKey
            })
        },

        addRule(key, rule) {
            this.VueForm_validation_internalRules[key] = rule
        },

        getStatus(key) {
            return _.get(this.VueForms_validation_registry, key);
        }
    }
})