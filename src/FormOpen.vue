<template>
    <form :id='vf_uid' v-bind='{name, enctype, novalidate}'>
        <input type='hidden' id='_method' name='_method' v-model="method"/>
        <input v-if='vf_csfrToken' type='hidden' name='_token' :value='vf_csfrToken'>
        <slot></slot>
        <form-save-button v-if='saves' :saving='saving' :is-dirty='isDirty' @save='save'></form-save-button>
    </form>
</template>

<script>
import { vf_uid } from './mixins'

export default {
    props: {
        saves: {
            type: Boolean,
            default: true
        },

        isDirty: {
            type: Boolean,
            default: false
        },

        name: {
            type: String,
            required: true
        },

        csfrToken: {
            type: [String, Boolean],
            required: false
        },

        method: {
            type: String,
            default: "POST"
        },

        multipart: {
            type: Boolean,
            default: false
        },

        novalidate: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            saving: false
        }
    },

    mounted() {
        this.$nextTick(()=>{
            window.foo = this.$children;
        })
    },

    methods : {
        formData () {
            var fromData = new FormData(this.$el);
            return formData;
        },

        finally () {
            this.saving = false;
        },

        save () {
            this.saving = true;
            this.http.post(this.formData, (respose)=>{
                this.$emit('saved', respose);
                this.finally();
            },(respose)=>{
                this.$emit('error', respose);
                this.finally();
            });
        }
    },

    computed : {
        vf_csfrToken() {
            if ( _.isString(this.csfrToken) ) return this.csfrToken;
            if ( this.csfrToken !== false && this.$vfconfig) {
                return this.$vfconfig.csfrToken();
            }
        },

        enctype () {
            return this.multipart ?
                "multipart/form-data" :
                "application/x-www-form-urlencoded";
        }
    }
}
</script>