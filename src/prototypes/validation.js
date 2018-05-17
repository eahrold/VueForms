import _ from 'lodash'
import Rules from '../data_sources/Rules'

const lang = {
    REQUIRED: 'This field is required',
    NUMBER: 'The value must be a number',
    EMAIL: 'This must be a valid email address',
    URL: 'The value must be a valid, secure url (https://)',
    MATCH: 'Does not match',
    DATE: 'The value must be a valid date',
    IMAGE: 'This must be a valid image'
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
                return Rules.required(value) || lang.REQUIRED
            },

            number: function (value) {
                return Rules.number(value) || lang.NUMBER
            },

            email: function (value) {
                return Rules.email(value) || lang.EMAIL
            },

            url: function (value) {
                return Rules.url(value) || lang.URL
            },

            date: function (value) {
                return Rules.date(value) || lang.DATE
            },

            match: function (compared, label) {
                const response = `${lang.MATCH} ${label || 'other value'}`
                return Rules.match(compared, label, response)
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

        get inUse () {
            return !_.isEmpty(this.VueForms_validation_registry)
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
