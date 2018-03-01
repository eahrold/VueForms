<template>
    <form-select
        v-model='aValue'
        v-bind='{
            property,
            options,
            label,
            errors,
            disabled,
            required,
        }'
        :multiple='false'
        width='100%' />
</template>

<script>

import { countryCodes } from './data_sources';

import { core } from './mixins';

export default {
    mixins: [ core ],

    data () {
        return {
            options: countryCodes,
        }
    },
}
</script>