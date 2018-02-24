<style scoped lang="css">
@import url('styles/transitions.css')

.vf-alert {
    position: fixed;
    right: 2em;
    z-index: 1000;
    transition: all .3s ease;
}

.vf-alert.top {
    top: 2em;
}

.vf-alert.bottom {
    bottom: 2em;
}

</style>

<template>
    <div>
    <transition-group class='vf-alert' :name='animation'>
        <div :key='message.hash'
            v-for='(message, idx) in messages'
            :style='{"z-index": message.zIndex}'
            class="alert alert-dismissable"
            :class='alertClass(message)'>
          <a href="#" class="close" @click.stop.prevent='dismiss(message, true)' aria-label="close">&times;</a>
          <span>{{ message.text }}</span>
          <slot></slot>
        </div>
    </transition-group>
    <form-modal class='vf-modal-sm' v-if='alert'>
        <div slot='body'>{{ alert.message }}</div>
        <div slot='footer'>
            <div class="btn btn-danger" @click='alert.callback(false)'>Cancel</div>
            <div class="btn btn-default" @click='alert.callback(true)'>OK</div>
        </div>
    </form-modal>
    </div>
</template>

<script type="text/javascript">

import _ from 'lodash'

import { vf_uid } from './mixins';
import { types } from './prototypes/vfalert'

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
            default: 'success'
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
            _timer: null,
            count: 1000,
        }
    },

    computed: {
    },

    //----------------------------------------------------------
    // Events
    //-------------------------------------------------------
    mounted() {

        if (this.$vfalert && _.isFunction(this.$vfalert.$on)) {
            this.$vfalert.$on(types.ALERT, this.onAlert)
            this.$vfalert.$on(types.TOAST, this.onToast)
            this.$vfalert.$on(types.CONFIRM, this.onConfirm)

        }
    },

    beforeDestroy() {
        if (this.$vfalert && _.isFunction(this.$vfalert.$off) ) {
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
                    this.dismiss(message)
                }, this.timeout)
            }
        }
    },


    //----------------------------------------------------------
    // Non-Reactive Properties
    //-------------------------------------------------------
    methods: {
        alertClass(message) {
            const status = _.get(message, 'status', this.status)
            const position = _.get(message, 'position', this.position)
            console.log({status, position});
            return [
                `alert-${status}`,
                position
            ]
        },

        onConfirm(message, options, callback) {
            this.alert={
                message,
                callback:(status)=>{
                    this.alert = null
                    callback(status)
                }
            }
        },


        onAlert(text, options) {
            return false;
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
                this.dismiss(message, true)
            }, timeout || this.timeout)

            return false;
        },

        dismiss(message, force) {
            if(this.dismisses || force === true) {
                this.messages = _.filter(this.messages, (msg)=>{return msg.hash != message.hash})
                if(this.messages.length === 0)this.count=1000 // Reset the count once everything is dismissed
            }
            this.$emit('dismissed', message.text)
        }
    },
}
</script>