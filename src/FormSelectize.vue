<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            v-if="label !== &quot;&quot;"
            :for="id"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <select
            v-if="multiple && options"
            :id="id"
            :name="property"
            :title="placeholder"
            :disabled="disabled"
            v-model="aValue"
            :class="{disabled: disabled}"
            :data-live-search="search"
            :data-width="width"
            class="selectpicker form-control"
            multiple>

            <!-- Options -->
            <option
                v-for="(opt, idx) in options"
                :data-content="opt.html"
                :key="idx"
                :value="opt.value || idx">
                {{ opt.text || opt.name || opt }}
            </option>

        </select>

        <select
            v-else-if="options"
            :id="id"
            :name="property"
            v-model="aValue"
            :class="{disabled: disabled}"
            :disabled="disabled"
            :data-live-search="search"
            :data-width="width"
            class="selectpicker">

            <!-- Options -->
            <option
                v-if="nullable"
                :value="null">{{ placeholder }}</option>
            <option
                v-for="(opt, idx) in options"
                :data-content="opt.html"
                :key="idx"
                :value="opt.value || idx">
                {{ opt.text || opt.name || opt }}
            </option>
        </select>

        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>

        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </div>
</template>

<script>
import { props, errors } from './mixins'

const $ = require('jquery')
require('bootstrap-select')

export default {
    mixins: [ props, errors ],

    props: {
        width: {
            type: String,
            default: 'auto'
        },

        search: {
            type: Boolean,
            default: true
        },

        options: {
            type: [ Array, Object ],
            required: false
        },

        multiple: {
            type: Boolean,
            default: false
        },

        nullable: {
            type: Boolean,
            default: true
        },

        placeholder: {
            type: String,
            default: 'Please Select...'
        }
    },

    data () {
        return {
            aValue: this.multiple ? [] : null,
            id: this.vf_uid
        }
    },

    watch: {
        disabled (change) {
            this.refresh()
        },

        options (change) {
            this.refresh()
        },

        aValue (change) {
            this.$emit('input', change)
        },

        value (change) {
            this.aValue = change
            this.refresh()
        }
    },

    mounted () {
        this.$nextTick(() => {
            if (this.value) {
                this.aValue = this.value
            }
            this.refresh()
        })
    },

    methods: {
        refresh () {
            this.$nextTick(() => {
                $('#' + this.id).selectpicker('refresh')
            })
        }
    }
}
</script>

<style type="text/css">
    @import url('~bootstrap-select/dist/css/bootstrap-select.min.css');
</style>
