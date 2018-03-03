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

    warn(message, options) {
        return this.alert(message, statuses.WARNING, options);
    },

    error(message, options) {
        return this.alert(message, statuses.DANGER, options);
    },

    errorResponse(response, fallback, xhr) {
        let message = _.get(response, 'data.message');
        if ( ! message && _.isObject(xhr)) {
            if(_.isObject(xhr)) {
                const { status, statusText } = xhr
                message = `<b class='text-danger'>${status}</b> ${statusText}</br>${fallback}`
            } else {
                message = fallback || "Ooops... Something went wrong"
            }
        }
        const errors = _.get(response, 'data.errors');
        return this.alert(message, statuses.DANGER, {errors, });
    },

    confirm(message, status) {
        return new Promise((fulfill, reject)=>{
            this.$emit(types.CONFIRM, message, {status, }, (aStatus)=>{
                if (aStatus) {
                    return fulfill()
                }
                return reject()
            })
        })
    },

    hasFormAlert() {
        return !!window.document.getElementById('vf-form-alert-panel');
    }
}


export default new Vue({methods,})
