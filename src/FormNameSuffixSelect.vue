<template>
    <form-selectize placeholder='Choose...' label='Suffix' width='100%' :multiple='false' v-model='aValue' :property='property' :options='suffixes' :errors='errors'></form-selectize>
</template>

<script>

import { suffixes } from './DataSources/Honorifics';

import { core } from './Mixins';

export default {
    mixins: [ core ],

    data () {
        return {
            suffixes: suffixes,
            aValue: null
        }
    },
}
</script>