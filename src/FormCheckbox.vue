<template>
    <div class="form-group" :class='formClass'>
        <div class="checkbox">
            <label class="control-label" :for="'checkbox-' + property">
                <input v-model='aValue'
                   :id="'checkbox-' + property"
                   type="checkbox">{{ aLabel }}
            </label>
        </div>
        <form-errors :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, watchers } from './FormElementMixins';

export default {
    mixins: [ props, errors, watchers ],

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
    }
}
</script>
