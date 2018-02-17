<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }} </label>
        <input type="password" :id="property" v-model='aValue' class="form-control" :placeholder="placeholder" :disabled='disabled'>
        <form-errors :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
}
</script>