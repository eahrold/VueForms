<template>
    <form-selectize placeholder='Choose...' label='Suffix' width='100%' :multiple='false' v-model='aValue' :property='property' :options='suffixes' :errors='errors'></form-selectize>
</template>

<script>

import { suffixes } from './DataSources/Honorifics';

import { props, errors, watchers } from './Mixins';

export default {
    mixins: [ props, errors, watchers ],

    data () {
        return {
            suffixes: suffixes,
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