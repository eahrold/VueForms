<template>
    <div class="form-group vf-form-group form-check vf-form-check" :class='formClass'>
        <div class="checkbox vf-checkbox">
            <label class="control-label form-check-label vf-control-label" :for="vf_uid">
                <input
                    v-model='aValue'
                    v-bind='$attrs'
                    v-on='$listeners'
                    :id="vf_uid"
                    :style='inputStyle'
                    :class='inputClass'
                    class="form-check-input vf-form-check-input"
                    type="checkbox">{{ aLabel }}
            </label>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { core } from './mixins'

export default {
    mixins: [ core ]
}
</script>
