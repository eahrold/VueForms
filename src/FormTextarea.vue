<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <textarea :id="vf_uid" :rows='rows' v-model='aValue' class="form-control" :disabled='disabled' :placeholder='placeholder'></textarea>
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

    props: {
        rows: {
            required: false,
            default: 3
        },
    },
}
</script>
