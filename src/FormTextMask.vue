<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label :for='vf_uid'>{{ aLabel }}: </label>
        <div class='text' :class='groupClass'>
            <the-mask
                v-model='aValue'
                v-bind='$attrs'
                v-on='$listeners'
                :id="vf_uid"
                :placeholder='placeholder'
                :name='property'
                :mask="mask"
                :disabled='disabled || !enabled'
                :style='inputStyle'
                :class='inputClass'
                @keydown.tab="autocomplete"
                class="form-control vf-form-control"/>
            <span v-if='showAddon' class="input-group-addon vf-input-group-addon">
                <slot name='addon'>
                    <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
                </slot>
            </span>

            <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
    </div>
</template>

<script>

import { TheMask } from 'vue-the-mask'
import { core } from './mixins';

export default {
    components: { TheMask },
    mixins: [ core ],

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
        }
    },

    computed : {
        showAddon() {
            return this.lockable || !!this.$slots.addon
        },

        groupClass() {
            return {'input-group': this.showAddon }
        },

        lockClass() {
            return this.enabled ? 'fa-unlock-alt':'fa-lock';
        }
    },

}
</script>