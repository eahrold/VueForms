<template>
    <div class="form-group vf-form-group">
        <label
            :for="property"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <div
            v-if="!inline"
            class="form-group-radio">
            <div
                v-for="(opt, idx) in options"
                :key="idx"
                class="radio">
                <label :for="`${vf_uid}-${idx}`">
                    <input
                        :name="property"
                        :id="`${vf_uid}-${idx}`"
                        :value="opt"
                        v-model="aValue"
                        type="radio">
                    {{ optionDescription(opt) }}
                </label>
                <br>
            </div>
        </div>

        <div
            v-else
            class="form-group-radio">
            <label
                v-for="(opt, idx) in options"
                :key="idx"
                :for="`${vf_uid}-${idx}`"
                class="control-label radio-inline">
                <input
                    :name="property"
                    :id="`${vf_uid}-${idx}`"
                    :value="opt"
                    v-model="aValue"
                    type="radio">
                {{ optionDescription(opt) }}
            </label>
        </div>
        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>
        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block">
            <small><slot name="help"/></small>
        </p>
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
