<template>
    <div class="form-group" :class='formClass'>
        <label :for='property'>{{ aLabel }}: </label>
        <div class='text' :class='groupClass'>
            <the-mask @keydown.tab="autocomplete" :id="property" :placeholder='placeholder' v-model='aValue' :name='property' :mask="mask" class="form-control" :disabled='!enabled'/>

            <span v-if='lockable' class="input-group-addon">
                <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
            </span>
            <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
        </div>
        <form-errors :errors='errors' :property='property'></form-errors>
    </div>
</template>

<script>

import { TheMask } from 'vue-the-mask'
import { props, errors, watchers } from './Mixins';

export default {
    components: { TheMask },
    mixins: [ props, errors, watchers ],

    props: {
        mask: {
            type: String,
            required: true
        },

        lockable: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            enabled: this.lockable === false ? true : false,
            aValue: null
        }
    },

    computed : {
        groupClass() {
            return {'input-group': this.lockable === true }
        },

        lockClass() {
            return this.enabled ? 'fa-unlock-alt':'fa-lock';
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