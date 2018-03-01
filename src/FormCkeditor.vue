<style lang='css'>
.ck-editor__editable {
    min-height: 10em;
}
</style>

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

        <textarea :name="property" :rows='rows' :id="vf_uid"></textarea>

        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>

        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>

import _ from 'lodash'
import {
    vf_uid,
    props,
    errors,
} from './mixins';

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


export default {
    components: {
        'form-file-gallery': FormFileGallery,
    },

    mixins: [
        vf_uid,
        props,
        errors,
    ],

    data() {
        return {
            showModal: false,
            editor: null
        }
    },

    props: {
        cfg: {
            type: Object,
            required: false
        },
        rows: {
            type: Number,
            default: 5,
        }
    },

    mounted() {
        const config = {
            toolbar: [ "undo", "redo", "bold", "italic", "blockquote", "imagetextalternative", "insertimage", "headings", "imagestylefull", "imagestyleside", "link", "numberedlist", "bulletedlist"],
            ckfinder: {
                // eslint-disable-next-line max-len
                uploadUrl: 'https://pretend.com'
            },
            image: {
                // You need to configure the image toolbar too, so it uses the new style buttons.
                toolbar: [ 'imageTextAlternative', '|', 'imageStyleAlignLeft', 'imageStyleFull', 'imageStyleAlignRight' ],

                styles: [
                    // This option is equal to a situation where no style is applied.
                    'imageStyleFull',

                    // This represents an image aligned to left.
                    'imageStyleAlignLeft',

                    // This represents an image aligned to right.
                    'imageStyleAlignRight'
                ]
            }
        }

        ClassicEditor
            .create( document.getElementById(this.vf_uid),config)
            .then( editor => {
                this.editor = editor;
                console.log(Array.from( editor.ui.componentFactory.names()))

                editor.document.on('changesDone', (evt, data) => {
                    this.$emit('input', this._last=editor.getData())
                });
            })
            .catch( error => {
                console.error( error );
            });
    },

    created() {
        this._last = null
    },

    beforeDestroy() {
        this.editor.destroy()
            .catch( error => {
                console.log( error );
            } );
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

    },

    watch: {
        value(newVal) {
            if(newVal !== this._last) {
                this.editor.setData(newVal);
            }
        }
    }

}
</script>
