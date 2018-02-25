import Vue from "Vue"

export const types = {
    TOAST: 'vfalert.TOAST',
    ALERT: 'vfalert.ALERT',
    CONFIRM: 'vfalert.CONFIRM',
}

const methods = {
    toast(message, status, options) {
        const { position, timeout } = _.isObject(options) ? options : {}
        this.$emit(types.TOAST, message, {status,  position, timeout })
    },

    success(message, options) {
        return this.alert(message, 'success', options);
    },

    info(message, options) {
        return this.alert(message, 'info', options);
    },

    warn(message, options) {
        return this.alert(message, 'warn', options);
    },

    error(message, options) {
        return this.alert(message, 'error', options);
    },

    alert(message, status, options) {
        const { timeout } = _.isObject(options) ? options : {}
        this.$emit(types.ALERT, message, {status, timeout})
    },

    confirm(message, {}) {
        return new Promise((fulfill, reject)=>{
            this.$emit(types.CONFIRM, message, {status: 'success'}, (status)=>{
                if (status) {
                    return fulfill()
                }
                return reject()
            })
        })

    },
}


export default new Vue({methods,})
