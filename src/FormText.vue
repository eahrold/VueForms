<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            v-if="showLabel"
            :for="vf_uid"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <div
            :class="groupClass"
            class="text">
            <input
                v-model="aValue"
                v-bind="$attrs"
                :type="type"
                :required="required"
                :name="property"
                :id="vf_uid"
                :disabled="disabled || !enabled"
                :style="inputStyle"
                :class="inputClass"
                class="form-control vf-form-control vf-input"
                v-on="$listeners"
                @blur="onBlur"
                @focus="onFocus"
                @keydown.tab="autocomplete">
            <span
                v-if="showAddon"
                class="input-group-addon input-group-prepend vf-input-group-addon vf-date-addon">
                <span class="input-group-text">
                    <slot name="addon">
                        <span
                            :class="lockClass"
                            class="fa"
                            @click="enabled = !enabled"/>
                    </slot>
                </span>
            </span>

            <form-errors
                v-if="displayErrors"
                v-bind="{errors, warning, property}"/>
            <p
                v-if="!!$slots['help']"
                class="help-block vf-help-block">
                <small><slot name="help"/></small>
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
