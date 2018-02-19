<template>
    <div class="form-group" :class='formClass'>
        <label :for='vf_uid'>{{ aLabel }}: </label>
        <div class='text' :class='groupClass'>
            <the-mask @keydown.tab="autocomplete" :id="vf_uid" :placeholder='placeholder' v-model='aValue' :name='property' :mask="mask" class="form-control" :disabled='!enabled'/>

            <span v-if='lockable' class="input-group-addon">
                <span @click='enabled = !enabled' class="fa" :class='lockClass'></span>
            </span>
            <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
    </div>
</template>

<script>

import { TheMask } from 'vue-the-mask'
import { core } from './mixins';

export default {
    components: { TheMask },
    mixins: [ core ],

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

}
</script>