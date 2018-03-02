<template>
    <div class="form-group">
        <label class='d-block' :for='property'>{{ aLabel }}</label>
        <div v-if='!inline' class='form-group-checkbox'>
            <div class='checkbox form-check' v-for='(opt, idx) in options'>
                <label class="control-label form-check-label" :for="`${vf_uid}-${idx}`">
                    <input type="checkbox"
                    class='form-check-input'
                    :name="property"
                    :id="`${vf_uid}-${idx}`"
                    :value="opt"
                    v-model='aValue'>
                    {{ optionDescription(opt) }}
                </label>
                <br>
            </div>
        </div>

        <div v-else class='form-group-checkbox form-check-inline'>
            <label v-for='(opt, idx) in options' class="checkbox-inline control-label form-check-label mr-2" :for="`${vf_uid}-${idx}`">
                <input type="checkbox"
                class='form-check-input'
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
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
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