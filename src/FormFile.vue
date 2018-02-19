<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <input type="file" :name="property" :id="vf_uid" :multiple="multiple">
        <small>Current File: {{ value }}</small>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { core } from './Mixins';

export default {
    mixins: [ core ],

    props : {
        multiple: {
            type: Boolean,
            default: true
        }
    },
}
</script>