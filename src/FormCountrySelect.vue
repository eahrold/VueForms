<template>
    <form-selectize  width='100%' :multiple='false' v-model='aValue' :property='property' :options='options' :label='label' :errors='errors' :disabled='disabled' :required='required'></form-selectize>
</template>

<script>

import { countryCodes } from './DataSources';

import { props, errors, watchers } from './Mixins';

export default {
    mixins: [ props, errors, watchers ],

    data () {
        return {
            options: countryCodes,
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