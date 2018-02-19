<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <input
            v-model.number='aValue'
            @blur='onBlur'
            @focus='onFocus'
            type="number"
            :name='property'
            :min='min'
            :max='max'
            :id="vf_uid"
            :placeholder="placeholder"
            number
            class="form-control">
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
        min: {
            type: [ Number, String ],
            default: Number.MIN_VALUE
        },

        max: {
            type: [ Number, String ],
            default: Number.MAX_VALUE
        },
    },
}
</script>