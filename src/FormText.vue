<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label v-if='showLabel' class="control-label vf-control-label" :for='vf_uid'>{{ aLabel }}</label>
        <div class='text' :class='groupClass'>
            <input
                v-model='aValue'
                v-bind='$attrs'
                v-on='$listeners'
                :type='type'
                :placeholder='placeholder'
                :required='required'
                :name='property'
                :id="vf_uid"
                :disabled='disabled || !enabled'
                :style='inputStyle'
                :class='inputClass'
                @blur='onBlur'
                @focus='onFocus'
                @keydown.tab="autocomplete"
                class="form-control vf-form-control vf-input">
            <span v-if='showAddon' class="input-group-addon input-group-prepend vf-input-group-addon vf-date-addon">
                <span class="input-group-text">
                    <slot name='addon'>
                        <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
                    </slot>
                </span>
            </span>

            <form-errors
                v-if='displayErrors'
                v-bind="{errors, warning, property}">
            </form-errors>
            <p v-if="!!$slots['help']" class="help-block vf-help-block">
                <small><slot name='help'></slot></small>
            </p>
        </div>
    </div>
</template>

<script>
import { core } from './mixins'

export default {
    mixins: [ core ],
    props: {
        type: {
            type: String,
            default: 'text'
        },

        lockable: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            enabled: this.lockable === false
        }
    },

    computed: {
        showAddon () {
            return this.lockable || !!this.$slots.addon
        },

        groupClass () {
            return {
                'input-group': this.showAddon
            }
        },

        lockClass () {
            return this.enabled ? 'fa-unlock-alt' : 'fa-lock'
        }
    }

}
</script>
