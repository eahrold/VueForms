<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <div class='text' :class='groupClass'>
            <input
                v-model='aValue'
                type="text"
                :name='property'
                :id="vf_uid"
                :placeholder='placeholder'
                :required='required'
                :disabled='disabled || !enabled'
                @blur='onBlur'
                @focus='onFocus'
                @keydown.tab="autocomplete"
                class="form-control"
                >
            <span v-if='lockable' class="input-group-addon">
                <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
            </span>
            <form-errors
                v-if='displayErrors'
                v-bind="{errors, warning, property}">
            </form-errors>
            <p v-if="!!$slots['help']" class="help-block">
                <small><slot name='help'></slot></small>
            </p>
        </div>
    </div>
</template>

<script>
import { core } from './mixins';

export default {
    mixins: [ core ],
    props: {
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
        groupClass() {
            return {'input-group': this.lockable === true }
        },

        lockClass() {
            return this.enabled ? 'fa-unlock-alt':'fa-lock';
        }
    },

}
</script>