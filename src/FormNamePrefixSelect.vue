<template>
    <form-select
        v-bind="{placeholder, label, property, options, errors, width}"
        v-model="aValue"
        :multiple="false"/>
</template>

<script>

import { prefixes } from './data_sources/Honorifics'

import { core } from './mixins'

export default {
    mixins: [ core ],

    props: {
        width: {
            type: String,
            default: '100%'
        },

        label: {
            type: String,
            default: 'Prefix'
        },

        placeholder: {
            type: String,
            default: 'Choose...'
        }
    },

    data () {
        return {
            options: prefixes,
            aValue: null
        }
    }
}
</script>
