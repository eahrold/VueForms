<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <tinymce v-model='aValue'></tinymce>
        <form-errors v-if='errors' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, watchers } from './Mixins';

export default {
    mixins: [ props, errors, watchers ],
    props: {
        rows: {
            required: false,
            default: 3
        },
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
