<template>
    <div class="form-group vf-form-group">
        <label class="control-label vf-control-label" :for='property'>{{ aLabel }}</label>
        <div v-if='!inline' class='form-group-radio'>
            <div class='radio' v-for='(opt, idx) in options'>
                <label :for="`${vf_uid}-${idx}`">
                    <input type="radio"
                        :name="property"
                        :id="`${vf_uid}-${idx}`"
                        :value="opt"
                        v-model='aValue'>
                    {{ optionDescription(opt) }}
                </label>
                <br>
            </div>
        </div>

        <div v-else class='form-group-radio'>
            <label v-for='(opt, idx) in options' class="control-label radio-inline" :for="`${vf_uid}-${idx}`">
                <input type="radio"
                :name="property"
                :id="`${vf_uid}-${idx}`"
                :value="opt"
                v-model='aValue'>
                {{ optionDescription(opt) }}
            </label>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block">
            <small><slot name='help'></slot></small>
        </p>
    </div>
</template>

<script>

import { core, options } from './mixins';

export default {
    mixins: [ core, options ],

    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },
}
</script>