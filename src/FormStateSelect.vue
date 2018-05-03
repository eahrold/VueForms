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
        :use-key-as-value='true'
        :multiple='false'
        width='100%'>
    </form-select>
</template>

<script>

import { states } from './data_sources'
import { core } from './mixins'

export default {
    mixins: [ core ],

    data () {
        return {
            options: states
        }
    }
}
</script>
