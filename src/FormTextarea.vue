<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            :for="vf_uid"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <textarea
            :id="vf_uid"
            :disabled="disabled"
            :rows="rows"
            :style="inputStyle"
            :class="inputClass"
            v-model="aValue"
            v-bind="$attrs"
            class="form-control vf-form-control"
            v-on="$listeners"/>

        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>
        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </div>
</template>

<script>

import { core } from './mixins'

export default {
    mixins: [ core ],

    props: {
        rows: {
            required: false,
            default: 3
        }
    }
}
</script>
