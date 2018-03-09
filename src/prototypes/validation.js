import Vue from "Vue"
import _ from 'lodash'
import moment from 'moment'

const VALIDATION_EVENT_REGISTRY_CHANGED = 'VALIDATION_EVENT_REGISTRY_CHANGED'

export const ValidationEvents = {
    'STATUS_CHANGE': VALIDATION_EVENT_REGISTRY_CHANGED,
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

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const HTTPS_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

const lang = {
    REQUIRED: "This is required",
    NUMBER: "The value must be a number",
    EMAIL: "The value must be a valid email address",
    URL: "The value must be a valid, secure url (https://)",
    MATCH: "Does not match",
    DATE: "The value must be a valid date",
}

export default new Vue({
    data: {

        VueForms_validation_registry: {},

        VueForm_validation_internalRules: {
            required: function(value) {
                if (!_.isEmpty(value)) {
                    return true;
                }
                return lang.REQUIRED
            },

            number: function(value) {
                if (_.isNumber(value)) {
                    return true;
                }
                return lang.NUMBER
            },

            email: function(value) {
                if (EMAIL_REGEX.test(value)) {
                    return true
                }
                return lang.EMAIL
            },

            url: function(value) {
                if (HTTPS_REGEX.test(value)) {
                    return true
                }
                return lang.URL
            },

            date: function(value) {
                if (moment(value).isValid()) {
                    return true
                }
                return lang.DATE
            },

            match: function(compared, label) {
                return function(value) {
                    if (compared == value) {
                        return true
                    }
                    return `${lang.MATCH} ${label || "other value"}`
                }
            },


        }
    },

    computed: {
        registry() {
            return _.reduce(this.VueForms_validation_registry, function(registry, value, key) {
                registry[key] = value === true;
                return registry;
            }, {});
        },

        failing() {
            return _.omitBy(this.registry, (value, key) => {
                return value === true
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
            handler: function(newVal) {
                this.$emit(VALIDATION_EVENT_REGISTRY_CHANGED, newVal)
            }
        },
    },

    methods: {
        clear() {
            this.VueForms_validation_registry = {}
        },

        update(key, status) {
            if (!_.has(this.VueForms_validation_registry, key)) {
                return this.register(key, status === true)
            }

            this.$set(this.VueForms_validation_registry, key, status === true)
        },

        register(key, status) {
            this.$set(this.VueForms_validation_registry, key, status === true)
        },

        unregister(key) {
            this.VueForms_validation_registry = _.omitBy(this.VueForms_validation_registry, (value, aKey) => {
                return key === aKey
            })
        },

        addRule(key, rule) {
            this.VueForm_validation_internalRules[key] = rule
        },

        getStatus(key) {
            return _.get(this.registry, key) === true;
        }
    }
})
