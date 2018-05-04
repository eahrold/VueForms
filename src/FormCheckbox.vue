<template>
    <div
        :class="formClass"
        class="form-group vf-form-group form-check vf-form-check">
        <div class="checkbox vf-checkbox">
            <label
                :for="vf_uid"
                class="control-label form-check-label vf-control-label">
                <input
                    v-model="aValue"
                    v-bind="$attrs"
                    :id="vf_uid"
                    :style="inputStyle"
                    :class="inputClass"
                    class="form-check-input vf-form-check-input"
                    type="checkbox"
                    v-on="$listeners">{{ aLabel }}
            </label>
        </div>
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
    mixins: [ core ]
}
</script>
