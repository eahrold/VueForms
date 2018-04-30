<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label v-if='label' class="control-label vf-control-label" :for='vf_uid'>{{ aLabel }}</label>
        <select class='form-control' v-model='aValue' :id='vf_uid' :name='property'>
            <option v-if='!required' :value="null">{{ placeholder || "Please Choose..." }}</option>
            <option v-for='(opt, idx) in options' :key='idx' :value="optionValue(opt, idx)">
                {{ optionDescription(opt) }}
            </option>
        </select>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>
import { core, options } from './mixins';

export default {
    mixins: [ core, options ],
    props: {},

}
</script>