<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label class="control-label vf-control-label" :for='vf_uid'>{{ aLabel }} </label>
        <input
            v-model='aValue'
            v-bind="$attrs"
            v-on="$listeners"
            type="password"
            :id="vf_uid"
            :placeholder="placeholder"
            :disabled='disabled'
            :style='inputStyle'
            :class='inputClass'
            @blur='onBlur'
            @focus='onFocus'
            class="form-control vf-form-control">
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { core } from './mixins';

export default {
    mixins: [ core ],
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
}
</script>