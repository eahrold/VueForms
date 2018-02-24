<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>

        <form-file-gallery
            v-if='showModal'
            @choose='chooseFile'
            @close='closeFilePicker'
            src-key='path'
            :add-meta='true'
            :endpoint='$vfconfig.filesEndpoint("images")'
          :errors='errors'>
        </form-file-gallery>

        <vue-tinymce :api-key="_apiKey" v-model='aValue' :init='init'></vue-tinymce>


        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>

        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import _ from 'lodash'
import VueTinymce from '@tinymce/tinymce-vue';
import { core } from './mixins';
import FormFileGallery from './FormFileGallery'

const imageTemplate = function({path, caption, alt, width, height, align}) {
    const style=''
    const attrs = _.reduce({src: path, alt, width, height, align}, (result, value, key)=>{
        if (value) {
            result += `${[key]}="${value}" `
        }
        return result;
    } ,'')
    let imgTemplate = `<img ${attrs} />`

    if(_.isString(caption)) {
        return `<figure class="image">${imgTemplate}<figcaption><p>${caption.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p></figcaption></figure>`
    }
    return imgTemplate;
}


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
        'form-file-gallery': FormFileGallery,
        'vue-tinymce': VueTinymce
    },

    mixins: [ core ],
    data() {
        return {
            showModal: false,
            editor: null
        }
    },

    props: {
        tinymceConfig: {
            type: Object,
            required: false
        },

        apiKey: {
            type: String,
            required: false
        }
    },

    methods: {
        closeFilePicker() {
            this.showModal = false;
        },

        openFilePicker() {
            this.showModal = true
        },

        chooseFile(file) {
            let content;
            if(_.isObject(file)) {
                content = file
            } else if(_.isString(file)) {
                content = {path: file}
            }
            this.editor.insertContent(imageTemplate(content))
            this.closeFilePicker()
        },
    },

    computed:{
        _apiKey() {
            return this.apiKey || _.get(this.$vfconfig, 'tinymce.apiKey')
        },

        init() {
            if(this.tinymceConfig) return tinymceConfig;

            let init = {
              setup:(editor)=>{
                this.editor = editor;
                editor.addButton('vf_image_picker', {
                    text: "Image Gallery",
                    icon: 'image',
                    tooltip: "Insert Image",
                    onclick: this.openFilePicker
                });
              }
            }
            return  _.assign(init, defaults, _.get(this.$vfconfig, 'tinymce.config', {}))
        }
    }

}
</script>
