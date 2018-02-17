<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <textarea :id="property" :rows='rows' v-model='aValue' class="form-control" :disabled='disabled' :placeholder='placeholder'></textarea>
        <form-errors v-if='errors' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],

    props: {
        rows: {
            required: false,
            default: 3
        },
    },
}
</script>
