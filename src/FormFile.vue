<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <input type="file" :name="property" :id="property" :multiple="multiple">
        <small>Current File: {{ value }}</small>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],

    props : {
        multiple: {
            type: Boolean,
            default: true
        }
    },
}
</script>