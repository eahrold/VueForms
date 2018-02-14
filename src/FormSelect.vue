<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" v-if='label' :for='property'>{{ aLabel }}</label>
        <select v-model='aValue' :name='property'>
            <option v-if='!required' :value="null">Please Choose...</option>
            <option v-for='(opt, idx) in options' :key='idx' :value="opt.value || idx">{{ opt.text || opt.name || opt }}</option>
        </select>
        <form-errors :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>
import { props, errors, watchers } from './FormElementMixins';

export default {
    mixins: [ props, errors, watchers ],
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