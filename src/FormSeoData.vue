<template>
    <form-panel>
        <h4>SEO Tags</h4>
        <form-text
            v-model="aValue.meta_title"
            :property="`{property}.meta_title`"
            :errors="errors"
            label="Meta Title"/>

        <form-text
            v-model="aValue.meta_description"
            :property="`{property}.meta_description`"
            :errors="errors"
            label="Meta Description"/>

        <form-text
            v-model="aValue.meta_keywords"
            :property="`{property}.meta_keywords`"
            :errors="errors"
            label="Meta Keywords"/>

        <form-text
            v-model="aValue.og_title"
            :property="`{property}.og_title`"
            :errors="errors"
            label="OG Title"/>

        <form-text
            v-model="aValue.og_description"
            :property="`{property}.og_description`"
            :errors="errors"
            label="OG Description"/>

        <form-text
            v-model="aValue.og_image"
            :property="`{property}.og_image`"
            :errors="errors"
            label="OG Image"
            placeholder="https://path.to.image">
            <template slot="help">Must Be A Valid URL</template>
        </form-text>
    </form-panel>
</template>

<script>

import { props, errors } from './mixins'

export default {

    mixins: [ props, errors ],

    data () {
        return {
            aValue: {
                meta_title: null,
                meta_description: null,
                meta_keywords: null,
                og_title: null,
                og_description: null
            }
        }
    },

    watch: {
        aValue: {
            handler: function (change) {
                this.$emit('input', change)
            },
            deep: true
        }
    },

    mounted () {
        this.$nextTick(() => {
            if (this.value) {
                this.aValue = this.value
            }
        })
    }
}
</script>
