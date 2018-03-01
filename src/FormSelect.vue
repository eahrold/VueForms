<template>
    <div class="form-group" :class='formClass'>
        <label v-if='label' class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <select class='form-control' v-model='aValue' :id='vf_uid' :name='property'>
            <option v-if='!required' :value="null">Please Choose...</option>
            <option v-for='(opt, idx) in options' :key='idx' :value="opt.value || idx">{{ opt.text || opt.name || opt }}</option>
        </select>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>
import { core } from './mixins';

export default {
    mixins: [ core ],
    props: {
        required: {
            type: Boolean,
            default: false
        },

        options: {
            type: [ Array, Object ],
            required: false
        }
    },

}
</script>