<template>
    <form-text
        v-model.number="aValue"
        v-bind="$attrs"
        :min="min"
        :max="max"
        :errors="errors"
        :property="property"
        :label="label"
        :style="inputStyle"
        :class="inputClass"
        type="number"
        number
        v-on="$listeners"/>
</template>

<script>

import { core } from './mixins'

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
        }
    }
}
</script>
