<template>
    <form-select placeholder='Choose...' label='Suffix' width='100%' :multiple='false' v-model='aValue' :property='property' :options='suffixes' :errors='errors'></form-select>
</template>

<script>

import { suffixes } from './data_sources/Honorifics';

import { core } from './mixins';

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