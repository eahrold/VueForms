<template>
    <div class='form-group vf-form-group' :class='formClass'>
        <label class="control-label vf-control-label" v-if='label !== ""' :for='id'>{{ aLabel }}</label>
        <select v-if='multiple && options'
            :id='id'
            :name='property'
            :title='placeholder'
            :disabled='disabled'
            v-model='aValue'
            class="selectpicker form-control"
            :class='{disabled: disabled}'
            :data-live-search="search"
            :data-width="width"
            multiple>

            <!-- Options -->
            <option v-for='(opt, idx) in options'
                    :data-content='opt.html'
                    v-bind:value="opt.value || idx">
                {{ opt.text || opt.name || opt }}
            </option>

        </select>

        <select v-else-if='options'
            :id='id'
            :name='property'
            v-model='aValue'
            class="selectpicker"
            :class='{disabled: disabled}'
            :disabled='disabled'
            :data-live-search="search"
            :data-width="width">

            <!-- Options -->
            <option v-if='nullable' :value="null">{{ placeholder }}</option>
            <option v-for='(opt, idx) in options'
                    :data-content='opt.html'
                    v-bind:value="opt.value || idx">
                {{ opt.text || opt.name || opt }}
            </option>
        </select>

        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>

        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>
import { props, errors } from './mixins'

const $ = require('jquery')
require('bootstrap-select');

export default {
    mixins: [ props, errors ],

    props: {
        width: {
            type: String,
            default: "auto"
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
            default: "Please Select..."
        }
    },

    data () {
        return {
            aValue: this.multiple ? [] : null,
            id: this.vf_uid
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
            this.refresh();
        });
    },

    methods : {
        refresh () {
            this.$nextTick(()=>{
                $('#'+this.id).selectpicker('refresh');
            });
        }
    },

    watch : {
        disabled (change) {
            this.refresh();
        },

        options (change) {
            this.refresh();
        },

        aValue (change) {
            this.$emit('input', change);
        },

        value (change) {
            this.aValue = change;
            this.refresh();
        }
    }
}
</script>

<style type="text/css">
    @import url('~bootstrap-select/dist/css/bootstrap-select.min.css');
</style>