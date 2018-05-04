<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            :for="vf_uid"
            class="control-label vf-control-label">{{ aLabel }} </label>
        <input
            v-model="aValue"
            v-bind="$attrs"
            :id="vf_uid"
            :placeholder="placeholder"
            :disabled="disabled"
            :style="inputStyle"
            :class="inputClass"
            type="password"
            class="form-control vf-form-control"
            v-on="$listeners"
            @blur="onBlur"
            @focus="onFocus">
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
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
