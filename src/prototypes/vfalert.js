import Vue from "Vue"

export const types = {
    TOAST: 'vfalert.TOAST',
    ALERT: 'vfalert.ALERT',
    CONFIRM: 'vfalert.CONFIRM',
}

const methods = {
    toast(message, status, options) {
        const { position } = _.isObject(options) ? options : {}
        this.$emit(types.TOAST, message, {status,  position })
    },

    success(message) {
        this.$emit(types.ALERT, message, {status: 'success'})
    },

    info(message) {
        this.$emit(types.ALERT, message, {status: 'success'})
    },

    warn(message) {
        this.$emit(types.ALERT, message, {status: 'success'})
    },

    error() {
        this.$emit(types.ALERT, message, {status: 'success'})
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
