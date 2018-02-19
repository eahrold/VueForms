<template>
    <form-selectize placeholder='Choose...' label='Prefix' width='100%' :multiple='false' v-model='aValue' :property='property' :options='prefixes' :errors='errors'></form-selectize>
</template>

<script>

import { prefixes } from './data_sources/Honorifics';

import { core } from './mixins';

export default {
    mixins: [ core ],

    data () {
        return {
            prefixes: prefixes,
            aValue: null
        }
    },
}
</script>