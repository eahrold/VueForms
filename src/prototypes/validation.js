import _ from 'lodash'
import moment from 'moment'

/* eslint-enable no-useless-escape */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const HTTPS_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
/* eslint-enable no-useless-escape */

const lang = {
    REQUIRED: 'This is required',
    NUMBER: 'The value must be a number',
    EMAIL: 'The value must be a valid email address',
    URL: 'The value must be a valid, secure url (https://)',
    MATCH: 'Does not match',
    DATE: 'The value must be a valid date'
}

export const ValidationSyncMixin = {
    mounted () {
        console.warn('The vue-forms ValidationSyncMixin is no longer required and should be removed.')
    }
}

export const ValidatorStore = function () {
    return {
        VueForms_validation_registry: {},

        VueForm_validation_internalRules: {
            required: function (value) {
                if (!_.isEmpty(value)) {
                    return true
                }
                return lang.REQUIRED
            },

            number: function (value) {
                if (_.isNumber(value)) {
                    return true
                }
                return lang.NUMBER
            },

            email: function (value) {
                if (EMAIL_REGEX.test(value)) {
                    return true
                }
                return lang.EMAIL
            },

            url: function (value) {
                if (HTTPS_REGEX.test(value)) {
                    return true
                }
                return lang.URL
            },

            date: function (value) {
                if (moment(value).isValid()) {
                    return true
                }
                return lang.DATE
            },

            match: function (compared, label) {
                return function (value) {
                    if (compared === value) {
                        return true
                    }
                    return `${lang.MATCH} ${label || 'other value'}`
                }
            }
        },

        // ----------------------------------------------------------
        // Computed
        // -------------------------------------------------------
        get registry () {
            return _.reduce(this.VueForms_validation_registry, function (registry, value, key) {
                registry[key] = value === true
                return registry
            }, {})
        },

        get failing () {
            return _.omitBy(this.registry, (value, key) => {
                return value === true
            })
        },

        get rules () {
            return this.VueForm_validation_internalRules
        },

        get passes () {
            return _.isEmpty(this.failing)
        },

        get fails () {
            return !this.passes
        },

        // ----------------------------------------------------------
        // Methods
        // -------------------------------------------------------
        clear () {
            this.VueForms_validation_registry = {}
        },

        update (key, status) {
            if (!_.has(this.VueForms_validation_registry, key)) {
                return this.register(key, status === true)
            }

            this.VueForms_validation_registry = _.assign({},
                this.VueForms_validation_registry,
                {[key]: status === true}
            )
        },

        register (key, status) {
            this.VueForms_validation_registry = _.assign({},
                this.VueForms_validation_registry,
                {[key]: status === true}
            )
        },

        unregister (key) {
            this.VueForms_validation_registry = _.omitBy(this.VueForms_validation_registry, (value, aKey) => {
                return key === aKey
            })
        },

        addRule (key, rule) {
            this.VueForm_validation_internalRules[key] = rule
        },

        getStatus (key) {
            return _.get(this.registry, key) === true
        }
    }
}
