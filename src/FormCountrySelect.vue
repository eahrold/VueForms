<template>
    <form-selectize  width='100%' :multiple='false' v-model='aValue' :property='property' :options='options' :label='label' :errors='errors' :disabled='disabled' :required='required'></form-selectize>
</template>

<script>

import { countryCodes } from './DataSources';

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],

    data () {
        return {
            options: countryCodes,
        }
    },
}
</script>