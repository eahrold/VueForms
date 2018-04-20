import Vue from "Vue"

export const types = {
    TOAST: 'vfalert.TOAST',
    ALERT: 'vfalert.ALERT',
    CONFIRM: 'vfalert.CONFIRM',
}

export const statuses = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger'
}

const methods = {
    toast(message, status, options) {
        const { position, timeout } = _.isObject(options) ? options : {}
        this.$emit(types.TOAST, message, {status,  position, timeout })
    },

    alert(message, status, options) {
        const { timeout, errors } = _.isObject(options) ? options : {}
        this.$emit(types.ALERT, message, {status, timeout, errors})
    },

    success(message, options) {
        return this.alert(message, statuses.SUCCESS, options);
    },

    info(message, options) {
        return this.alert(message, statuses.INFO, options);
    },

    warning(message, options) {
        return this.alert(message, statuses.WARNING, options);
    },

    error(message, options) {
        return this.alert(message, statuses.DANGER, options);
    },

    errorResponse(response, fallback, xhr) {
        let message = _.isString(response) ? response : _.get(response, 'data.message');
        if ( ! message && _.isObject(xhr)) {
            const { status, statusText } = xhr
            message = `<b class='text-danger'>${status}</b> ${statusText}</br>${fallback}`
        }

        const errors = _.get(response, 'data.errors');
        return this.alert(message || fallback || "Ooops... Something went wrong", statuses.DANGER, {errors, });
    },

    confirm(message, status, options) {
        return new Promise((fulfill, reject)=>{
            this.$emit(types.CONFIRM, message, {...options, status, }, {fulfill, reject},)
        })
    },

    hasFormAlert() {
        return !!window.document.getElementById('vf-form-alert-panel');
    }
}


export default new Vue({methods,})
