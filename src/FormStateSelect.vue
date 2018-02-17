<template>
    <form-selectize  width='100%' :multiple='false' v-model='aValue' :property='property' :options='states' :label='label' :errors='errors' :disabled='disabled' :required='required'></form-selectize>
</template>

<script>

import { states } from './DataSources';

import { props, errors, values } from './Mixins';

export default {
    mixins: [ props, errors, values ],

    data () {
        return {
            states: states,
        }
    },
}
</script>