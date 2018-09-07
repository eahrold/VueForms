<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            v-if="label"
            :for="vf_uid"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <select
            v-model="aValue"
            :id="vf_uid"
            :name="property"
            v-bind="$attrs"
            class="form-control">
            <option
                v-if="!required"
                :value="null">{{ placeholder || "Please Choose..." }}</option>
            <option
                v-for="(opt, idx) in options"
                :key="idx"
                :value="optionValue(opt, idx)">
                {{ optionDescription(opt) }}
            </option>
        </select>
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
    props: {}

}
</script>
