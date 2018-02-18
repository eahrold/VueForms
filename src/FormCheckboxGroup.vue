<template>
    <div class="form-group">
        <label :for='property'>{{ aLabel }}</label>
        <div v-if='!inline' class='form-group-checkbox'>
            <div class='checkbox' v-for='(opt, idx) in options'>
                <label class="control-label" :for="'checkbox-'+property+'-'+idx">
                    <input type="checkbox"
                    :name="'checkbox-'+property+'-'+idx"
                    :id="'checkbox-'+property+'-'+idx"
                    :value="opt.value || idx"
                    v-model='aValue'>
                    {{ opt.text || opt.name || opt }}
                </label>
                <br>
            </div>
        </div>

        <div v-else class='form-group-checkbox'>
            <label v-for='(opt, idx) in options' class="checkbox-inline control-label" :for="'checkbox-'+property+'-'+idx">
                <input type="checkbox"
                :name="'checkbox-'+property+'-'+idx"
                :id="'checkbox-'+property+'-'+idx"
                :value="opt.value || idx"
                v-model='aValue'>
                {{ opt.text || opt.name || opt }}
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

import { props, errors, values, options } from './Mixins';

export default {
    mixins: [ props, errors, values, options ],

    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },

}
</script>