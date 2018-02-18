<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <div class='text' :class='groupClass'>
            <input
                v-model='aValue'
                type="text"
                :name='property'
                :id="property"
                :placeholder='placeholder'
                @blur='onBlur'
                @focus='onFocus'
                @keydown.tab="autocomplete"
                class="form-control"
                :disabled='disabled || !enabled'>
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
import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],
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