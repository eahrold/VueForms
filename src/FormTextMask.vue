<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label :for="vf_uid">{{ aLabel }}: </label>
        <div
            :class="groupClass"
            class="text">
            <the-mask
                v-model="aValue"
                v-bind="$attrs"
                :id="vf_uid"
                :name="property"
                :mask="mask"
                :disabled="disabled || !enabled"
                :style="inputStyle"
                :class="inputClass"
                class="form-control vf-form-control"
                v-on="$listeners"
                @keydown.tab="autocomplete"/>
            <span
                v-if="showAddon"
                class="input-group-addon vf-input-group-addon">
                <slot name="addon">
                    <span
                        :class="lockClass"
                        class="fa"
                        @click="enabled = !enabled"/>
                </slot>
            </span>

            <p
                v-if="!!$slots['help']"
                class="help-block vf-help-block"><small><slot name="help"/></small></p>
        </div>
        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>
    </div>
</template>

<script>

import { TheMask } from 'vue-the-mask'
import { core } from './mixins'

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
