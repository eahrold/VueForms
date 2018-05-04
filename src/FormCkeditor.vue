<style lang='css'>
.ck-editor__editable {
    min-height: 10em;
}
</style>

<template>
    <div
        v-if="hasEditor"
        :class="formClass"
        class="form-group vf-form-group">
        <label
            :for="vf_uid"
            class="control-label vf-control-label">{{ aLabel }}</label>

        <form-file-gallery
            v-if="showModal"
            :add-meta="true"
            :endpoint="$vfconfig.filesEndpoint(&quot;images&quot;)"
            :errors="errors"
            src-key="path"
            @choose="chooseFile"
            @close="closeFilePicker"/>

        <textarea
            :name="property"
            :rows="rows"
            :id="vf_uid">
            <div>--- Enter Text Here ---</div>
            <div>--- Place Image Above ---</div>
        </textarea>

        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>

        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </div>
</template>

<script>

import _ from 'lodash'
import {
    vf_uid,
    props,
    errors
} from './mixins'

import FormFileGallery from './FormFileGallery'

const ClassicEditor = window.ClassicEditor

const imageTemplate = function ({path, caption, alt, width, height, align}) {
    // const style = ''
    const attrs = _.reduce({src: path, alt, width, height, align}, (result, value, key) => {
        if (value) {
            result += `${[key]}="${value}" `
        }
        return result
    }, '')
    let imgTemplate = `<img ${attrs} />`

    if (_.isString(caption)) {
        return `<figure class="image">${imgTemplate}<figcaption><p>${caption.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p></figcaption></figure>`
    }
    return imgTemplate
}

class FileUploadAdapter {
    constructor (loader, {endpoint, headers}) {
        this.loader = loader
        this.endpoint = endpoint
        this.config = { headers }
    }

    responseHandler ({target}) {
        const success = (target.status === 200) || (target.status === 201)
        try {
            const json = JSON.parse(target.responseText)
            return {
                success,
                default: json.data.src
            }
        } catch (e) {
            return {
                success,
                message: 'There was a problem uploading the file.'
            }
        }
    }

    errorHandler ({target}) {
        return {
            success: false,
            message: 'There was a problem uploading the file.'
        }
    }

    upload () {
        const data = new FormData()
        data.append('file', this.loader.file)

        return new Promise((resolve, reject) => {
            const XHR = new XMLHttpRequest()

            // Set up our request
            XHR.open('POST', this.endpoint)

            _.forOwn(this.config.headers, (value, key) => {
                XHR.setRequestHeader(key, value)
            })

            // Define what happens on successful data submission
            XHR.addEventListener('load', (event) => {
                const response = this.responseHandler(event)

                if (response.success) {
                    console.log('Fulfilling', response)
                    return resolve(response)
                }
                return resolve(this.loader.file)
                // return reject(response.message)
            })

            // Define what happens in case of error
            XHR.addEventListener('error', (event) => {
                const response = this.errorHandler(event)
                reject(response)
            })

            // Send our FormData object; HTTP headers are set automatically
            XHR.send(data)
        })
    }

    abort () {
    //
    }
}

export default {
    components: {
        'form-file-gallery': FormFileGallery
    },

    mixins: [
        vf_uid,
        props,
        errors
    ],

    props: {
        cfg: {
            type: Object,
            required: false
        },
        rows: {
            type: Number,
            default: 5
        }
    },

    data () {
        return {
            showModal: false,
            editor: null
        }
    },

    computed: {
        hasEditor () {
            return !!ClassicEditor
        },

        _headers () {
            return this.headers || this.$vfconfig.headers
        },

        _endpoint () {
            return this.endpoint || this.$vfconfig.endpoints.upload
        }
    },

    watch: {
        value (newVal) {
            if (newVal !== this._last) {
                this.editor.setData(newVal)
            }
        }
    },

    mounted () {
        if (!this.hasEditor) {
            console.error('CKeditor Requires ClassicEditor to be installed')
            return
        }

        const config = {
            toolbar: [
                'undo',
                'imageUpload',
                'redo',
                'heading',
                'bold',
                'italic',
                'blockquote',
                'link',
                'numberedlist',
                'bulletedlist'
            ],
            ckfinder: {
                // eslint-disable-next-line max-len
                // uploadUrl: 'http://pretend.com'
            },
            image: {
                // You need to configure the image toolbar too, so it uses the new style buttons.
                toolbar: [
                    'imageTextAlternative',
                    '|',
                    'imageStyle:alignLeft',
                    'imageStyle:alignCenter',
                    'imageStyle:alignRight',
                    'imageStyle:full',
                    'imageStyle:side'
                ],

                styles: [
                    // This option is equal to a situation where no style is applied.
                    'full',

                    'side',

                    'alignCenter',

                    // This represents an image aligned to left.
                    'alignLeft',

                    // This represents an image aligned to right.
                    'alignRight'
                ]
            }
        }

        ClassicEditor
            .create(document.getElementById(this.vf_uid), config)
            .then(editor => {
                this.editor = editor

                const plugins = ClassicEditor.build.plugins.map(plugin => plugin.pluginName)
                const toolbar = Array.from(editor.ui.componentFactory.names())
                console.log('[VF] CKeditor Config', {toolbar, plugins})

                editor.model.document.on('change', (evt, data) => {
                    // console.log("chage", {evt, data})
                    this.$emit('input', this._last = editor.getData())
                })

                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    const config = {
                        'headers': this._headers,
                        'endpoint': this._endpoint
                    }
                    return new FileUploadAdapter(loader, config)
                }
            })
            .catch(error => {
                console.error(error)
            })
    },

    created () {
        this._last = null
    },

    beforeDestroy () {
        this.editor.destroy()
            .catch(error => {
                console.log(error)
            })
    },

    methods: {
        closeFilePicker () {
            this.showModal = false
        },

        openFilePicker () {
            this.showModal = true
        },

        chooseFile (file) {
            let content
            if (_.isObject(file)) {
                content = file
            } else if (_.isString(file)) {
                content = {path: file}
            }
            this.editor.insertContent(imageTemplate(content))
            this.closeFilePicker()
        }
    }
}
</script>
