<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label class="control-label vf-control-label" :for='vf_uid'>{{ aLabel }}</label>
        <textarea
        :id="vf_uid"
        :disabled='disabled'
        :placeholder='placeholder'
        :rows='rows'
        :style='inputStyle'
        :class='inputClass'
        v-model='aValue'
        v-bind='$attrs'
        v-on='$listeners'
        class="form-control vf-form-control">
        </textarea>

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
        rows: {
            required: false,
            default: 3
        },
    },
}
</script>
