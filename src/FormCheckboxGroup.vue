<template>
    <div class="form-group vf-form-group">
        <label
            :for="property"
            class="d-block">{{ aLabel }}</label>
        <div
            v-if="!inline"
            class="form-group-checkbox vf-form-group-checkbox">
            <div
                v-for="(opt, idx) in options"
                :key="idx"
                class="checkbox form-check vf-checkbox">
                <label
                    :for="`${vf_uid}-${idx}`"
                    class="control-label form-check-label vf-control-label">
                    <input
                        :name="property"
                        :id="`${vf_uid}-${idx}`"
                        :value="optionValue(opt, idx)"
                        v-model="aValue"
                        type="checkbox"
                        class="form-check-input">
                    {{ optionDescription(opt) }}
                </label>
                <br>
            </div>
        </div>

        <div
            v-else
            class="form-group-checkbox form-check-inline">
            <label
                v-for="(opt, idx) in options"
                :key="idx"
                :for="`${vf_uid}-${idx}`"
                class="checkbox-inline control-label form-check-label mr-2">
                <input
                    :name="property"
                    :id="`${vf_uid}-${idx}`"
                    :value="optionValue(opt, idx)"
                    v-model="aValue"
                    type="checkbox"
                    class="form-check-input">
                {{ optionDescription(opt) }}
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

import { core, options } from './mixins'

export default {
    mixins: [ core, options ],

    props: {
        inline: {
            type: Boolean,
            default: false
        }
    }

}
</script>
