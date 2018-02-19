<template>
    <form-panel>
            <h4>SEO Tags</h4>
            <form-text label='Meta Title' v-model='aValue.meta_title' :property='`{property}.meta_title`' :errors='errors'></form-text>

            <form-text label='Meta Description' v-model='aValue.meta_description' :property='`{property}.meta_description`' :errors='errors'></form-text>

            <form-text label='Meta Keywords' v-model='aValue.meta_keywords' :property='`{property}.meta_keywords`' :errors='errors'></form-text>

            <form-text label='OG Title' v-model='aValue.og_title' :property='`{property}.og_title`' :errors='errors'></form-text>

            <form-text label='OG Description' v-model='aValue.og_description' :property='`{property}.og_description`' :errors='errors'></form-text>

            <form-text label='OG Image' placeholder='https://path.to.image' v-model='aValue.og_image' :property='`{property}.og_image`' :errors='errors'>
                <template slot='help'>Must Be A Valid URL</template>
            </form-text>
    </form-panel>
</template>

<script>

import { props, errors } from './mixins';

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

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },

    watch : {
        aValue: {
            handler: function(change){
                this.$emit('input', change);
            },
            deep: true
        },
    }
}
</script>