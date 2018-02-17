<template>
    <form-selectize placeholder='Choose...' label='Prefix' width='100%' :multiple='false' v-model='aValue' :property='property' :options='prefixes' :errors='errors'></form-selectize>
</template>

<script>

import { prefixes } from './DataSources/Honorifics';

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],

    data () {
        return {
            prefixes: prefixes,
            aValue: null
        }
    },
}
</script>