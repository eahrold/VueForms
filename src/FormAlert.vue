<template>
    <div class='vf-alert'>
    <transition-group :name='animation'>
        <div :key='message.hash'
            v-for='(message, idx) in messages'
            :style='{"z-index": message.zIndex}'
            class="alert alert-dismissable"
            :class='toastClass(message)'>
          <a href="#" class="close" @click.stop.prevent='dismissToast(message, true)' aria-label="close">&times;</a>
          <span v-html='message.text'></span>
          <slot></slot>
        </div>
    </transition-group>

    <form-modal class='vf-modal-sm' v-if='alert' @close='closeAlert'>
        <div slot='body' class='text-center'>
            <h1 v-if='!!alert.status'><i class="fa fa-3x" :class='alertIconClass' aria-hidden="true"></i></h1>
            <h4 v-html='alert.message'></h4>
            <ul class='list-unstyled text-danger' v-if='flattenedAlertErrors.length'>
                <li class='list-item' v-for='(error, key) in flattenedAlertErrors'><b>{{ error }}</b></li>
            </ul>
        </div>
        <div v-if='alert.callback' class='text-right' slot='footer'>
            <div class="btn btn-danger" @click='alert.callback(false)'>Cancel</div>
            <div class="btn btn-default" @click='alert.callback(true)'>OK</div>
        </div>
    </form-modal>

    </div>
</template>

<script type="text/javascript">

import _ from 'lodash'

import { vf_uid } from './mixins';
import { types, statuses } from './prototypes/vfalert'

export default {

    mixins: [ vf_uid ],

    props: {
        message: {
            type: String,
            required: "",
        },

        position: {
            type: String,
            default: 'top'
        },

        status: {
            type: String,
            default: statuses.SUCCESS
        },

        dismisses: {
            type: Boolean,
            default: true
        },

        timeout: {
            type: Number,
            default: 5000
        },

        animation: {
            type: String,
            default: 'alert-bounce'
        }
    },

    //----------------------------------------------------------
    // Local State
    //-------------------------------------------------------
    data() {
        return {
            messages: [],
            alert: null,
            count: 1000,
            alertTimer: null,
        }
    },

    computed: {
        alertIconClass() {
            let status = statuses.SUCCESS
            switch(_.get(this.alert, 'status')) {
                case statuses.SUCCESS:
                    status='check-circle'
                    break
                case statuses.INFO:
                    status='info-circle'
                    break
                case statuses.WARNING:
                case statuses.DANGER:
                    status='exclamation-triangle'
                    break
                default:
                    break
            }
            return [`fa-${status}`, `text-${this.alert.status}`]
        },

        flattenedAlertErrors() {
            const errors = _.flatten(_.values(_.get(this.alert, 'errors', {})))
            const left = errors.splice(5);
            if(left.length) {
                return errors.concat(`...and ${left.length} more`)
            }
            return errors;
        }
    },

    //----------------------------------------------------------
    // Events
    //-------------------------------------------------------
    created() {
        this.alertTimer = null
        this.toastTimer = null
    },

    mounted() {
        if (this.$vfalert && _.isFunction(this.$vfalert.$on)) {
            this.$vfalert.$on(types.ALERT, this.onAlert)
            this.$vfalert.$on(types.TOAST, this.onToast)
            this.$vfalert.$on(types.CONFIRM, this.onConfirm)
        }
    },

    beforeDestroy() {
        if (this.$vfalert && _.isFunction(this.$vfalert.$off)) {
            this.$vfalert.$off(types.ALERT, this.onAlert)
            this.$vfalert.$off(types.TOAST, this.onToast)
            this.$vfalert.$off(types.CONFIRM, this.onConfirm)
        }
    },

    watch: {
        message(aVal) {
            if (!_.isEmpty(aVal)) {

                const message = {
                    hash: this.makeVfUuid(),
                    text: aVal
                }

                this.messages.unshift(message)

                setTimeout(()=>{
                    this.dismissToast(message)
                }, this.timeout)
            }
        }
    },


    //----------------------------------------------------------
    // Non-Reactive Properties
    //-------------------------------------------------------
    methods: {
        //----------------------------------------------------------
        // Alert
        //-------------------------------------------------------
        closeAlert() {
            if(!!this.alert && _.isFunction(this.alert.callback)) {
                this.alert.callback(false)
            }
            this.alert = null
            clearTimeout(this.alertTimer)
        },

        onConfirm(message, options, callback) {
            const { status, position, timeout } = _.isObject(options) ? options : {}

            this.alert={
                message,
                status,
                callback:(status)=>{
                    this.alert = null
                    callback(status)
                }
            }
            return false;
        },

        onAlert(text, options) {
            const { status, timeout, errors, max } = _.isObject(options) ? options : {}
            let message = `${text}`.substring(0, max || 997)

            if(text.length !== message.length) {
                message+='...'
            }

            clearTimeout(this.alertTimer)
            this.alert={
                message,
                status,
                errors,
            }
            if(_.isNumber(timeout)){
                this.alertTimer = setTimeout(t=>this.closeAlert(),timeout)
            }
            return false;
        },

        //----------------------------------------------------------
        // Toast
        //-------------------------------------------------------
        toastClass(message) {
            const status = _.get(message, 'status', this.status)
            const position = _.get(message, 'position', this.position)
            console.log({status, position});
            return [
                `alert-${status}`,
                position
            ]
        },

        onToast(text, options) {
            const zIndex = this.count = this.count + 1
            const { status, position, timeout } = _.isObject(options) ? options : {}

            const message = {
                text,
                zIndex,
                hash: this.makeVfUuid(),
                status: status || this.status,
                position: position || this.position,
            }

            this.messages.unshift(message)
            if(timeout === false)return;

            setTimeout(()=>{
                this.dismissToast(message, true)
            }, timeout || this.timeout)

            return false;
        },

        dismissToast(message, force) {
            if(this.dismisses || force === true) {
                this.messages = _.filter(this.messages, (msg)=>{return msg.hash != message.hash})
                if(this.messages.length === 0)this.count=1000 // Reset the count once everything is dismissed
            }
            this.$emit('dismissed', message.text)
        }
    },
}
</script>

<style lang="scss" scoped>

.vf-alert {
    position: fixed;
    right: 2em;
    top: 0em;
    z-index: 1000;
    transition: all .3s ease;
}

.vf-alert .alert.top {
    position: fixed;
    right: 2em;
    top: 1em;
}

.vf-alert .alert.bottom {
    position: fixed;
    right: 2em;
    bottom: 1em;
}

@import url('styles/transitions.css')
</style>
