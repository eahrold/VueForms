<template>
    <form-selectize
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

import { countryCodes } from './DataSources';

import { core } from './Mixins';

export default {
    mixins: [ core ],

    data () {
        return {
            options: countryCodes,
        }
    },
}
</script>