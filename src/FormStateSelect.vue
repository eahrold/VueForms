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
        width='100%'>
    </form-selectize>
</template>

<script>

import { states } from './data_sources';

import { core } from './mixins';

export default {
    mixins: [ core ],

    data () {
        return {
            options: states,
        }
    },
}
</script>