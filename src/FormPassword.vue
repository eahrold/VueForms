<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }} </label>
        <input
            type="password"
            :id="vf_uid"
            v-model='aValue'
            class="form-control"
            :placeholder="placeholder"
            @blur='onBlur'
            @focus='onFocus'
            :disabled='disabled'>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
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