<template>
    <div class="form-group">
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <div v-if='!inline' class='form-group-radio'>
            <div class='radio' v-for='(opt, idx) in options'>
                <label :for="'radio-'+property+'-'+idx">
                    <input type="radio"
                        :name="'radio-'+property+'-'+idx"
                        :id="property"
                        v-bind:value="opt.value || idx"
                        v-model='aValue'>
                    {{ opt.text || opt.name || opt }}
                </label>
                <br>
            </div>
        </div>

        <div v-else class='form-group-radio'>
            <label v-for='(opt, idx) in options' class="control-label radio-inline" :for="'radio-'+property+'-'+idx">
                <input type="radio"
                :name="'radio-'+property+'-'+idx"
                :id="property"
                :value="opt.value || idx"
                v-model='aValue'>
                {{ opt.text || opt.name || opt }}
            </label>
        </div>
        <form-errors :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, watchers, options } from './Mixins';

export default {
    mixins: [ props, errors, watchers, options ],

    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            aValue: null
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },
}
</script>