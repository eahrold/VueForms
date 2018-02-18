<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='property'>{{ aLabel }}</label>
        <vue-tinymce :api-key="_apiKey" v-model='aValue' :init='init'></vue-tinymce>
        <form-errors v-if='errors' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import { props, errors, values } from './Mixins';
// import VueTinymce from './Vue/VueTinymce.vue'

import VueTinymce from '@tinymce/tinymce-vue';


const defaults = {
    height: 300,
    image_caption: true,
    image_advtab: true,

    remove_script_host : false,
    relative_urls : false,
    convert_urls : true,
}

export default {
    components: {
        'vue-tinymce' : VueTinymce
    },

    mixins: [ props, errors, values ],
    props: {
        rows: {
            required: false,
            default: 3
        },
        config: {
            type: Object,
            required: false
        },
        apiKey: {
            type: String,
            required: false
        }
    },

    computed:{
        _apiKey() {
            return this.apiKey || _.get(this.$vfconfig, 'tinymce.apiKey')
        },

        init() {
            return this.config ||
                _.assign({}, defaults, _.get(this.$vfconfig, 'tinymce.config', {}))
        }
    }

}
</script>
