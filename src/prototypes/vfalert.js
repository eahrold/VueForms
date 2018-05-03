import Vue from 'Vue'
import _ from 'lodash'

export const types = {
    TOAST: 'vfalert.TOAST',
    ALERT: 'vfalert.ALERT',
    CONFIRM: 'vfalert.CONFIRM'
}

export const statuses = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger'
}

const methods = {
    toast (message, status, options) {
        const { position, timeout } = _.isObject(options) ? options : {}
        this.$emit(types.TOAST, message, { status, position, timeout })
    },

    alert (message, status, options) {
        const { timeout, errors } = _.isObject(options) ? options : {}
        this.$emit(types.ALERT, message, { status, timeout, errors })
    },

    success (message, options) {
        return this.alert(message, statuses.SUCCESS, options)
    },

    info (message, options) {
        return this.alert(message, statuses.INFO, options)
    },

    warning (message, options) {
        return this.alert(message, statuses.WARNING, options)
    },

    error (message, options) {
        return this.alert(message, statuses.DANGER, options)
    },

    errorResponse (response, fallback, xhr) {
        const data = _.get(response, 'data', response)

        let message = _.isString(response) ? response : _.get(data, 'message')
        if (!message && _.isObject(xhr)) {
            const { status, statusText } = xhr
            message = `<b class='text-danger'>${status}</b> ${statusText}</br>${fallback}`
        }

        const errors = _.get(data, 'errors')
        return this.alert(message || fallback || 'Ooops... Something went wrong', statuses.DANGER, { errors })
    },

    confirm (message, status, options) {
        return new Promise((resolve, reject) => {
            this.$emit(types.CONFIRM, message, { ...options, status }, { resolve, reject })
        })
    },

    hasFormAlert () {
        return !!window.document.getElementById('vf-form-alert-panel')
    }
}

export default new Vue({methods})
