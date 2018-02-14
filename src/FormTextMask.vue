<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}: </label>
        <div class='text' :class='groupClass'>
            <input @keydown.tab="autocomplete" :data-mask="mask" :name='property' type="text" :id="property" v-model='aValue' class="form-control" :disabled='!enabled'>
            <span v-if='lockable' class="input-group-addon">
                <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
            </span>
            <form-errors :errors='errors' :property='property'></form-errors>
            <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
        </div>
    </div>
</template>

<script>

import { props, errors, watchers } from './Mixins';

const $ = require('jquery')
require('jquery-mask-plugin');

export default {
    mixins: [ props, errors, watchers ],
    props: {
        mask: {
            type: String,
            required: true
        },

        lockable: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            enabled: this.lockable === false ? true : false,
            aValue: null
        }
    },

    computed : {
        groupClass() {
            return {'input-group': this.lockable === true }
        },

        lockClass() {
            return this.enabled ? 'fa-unlock-alt':'fa-lock';
        }
    },

    mounted () {
        this.$nextTick(()=>{
            $("#"+this.property).mask(this.mask);
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },
}
</script>