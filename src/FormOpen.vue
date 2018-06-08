<template>
    <form
        :id="vf_uid"
        v-bind="{name, enctype, novalidate}">
        <input
            @submit.prevent='save'
            id="_method"
            v-model="method"
            type="hidden"
            name="_method">
        <input
            v-if="vf_csfrToken"
            :value="vf_csfrToken"
            type="hidden"
            name="_token">
        <slot/>
        <form-save-button
            v-if="saves"
            :saving="saving"
            :is-dirty="isDirty"
            @save="save"/>
    </form>
</template>

<script>

import _ from 'lodash'
import { vf_uid } from './mixins'

export default {
    mixins: [ vf_uid ],

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
            default: 'POST'
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

    computed: {
        vf_csfrToken () {
            if (_.isString(this.csfrToken)) return this.csfrToken
            if (this.csfrToken !== false && this.$vfconfig) {
                return this.$vfconfig.csfrToken()
            }
        },

        enctype () {
            return this.multipart
                ? 'multipart/form-data'
                : 'application/x-www-form-urlencoded'
        }
    },

    mounted () {},

    methods: {
        formData () {
            var formData = new FormData(this.$el)
            return formData
        },

        finally () {
            this.saving = false
        },

        save () {
            this.saving = true
            this.$http.post(this.formData, (respose) => {
                this.$emit('saved', respose)
                this.finally()
            }, (respose) => {
                this.$emit('error', respose)
                this.finally()
            })
        }
    }
}
</script>
