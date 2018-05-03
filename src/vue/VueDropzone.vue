<template>
<form :action="url" :id='rootId' :class='{dropzone: id === rootId}'>
    <div v-if="!!$slots['button']" :id="id" class="btn btn-primary btn-dropzone">
        <slot name='button'></slot>
    </div>
</form>
</template>

<script>
import vf_uid from '../mixins/vf_uid'

const Dropzone = require('dropzone')
Dropzone.autoDiscover = false

export default {
    mixins: [vf_uid],

    props: {
        value: {
            type: String
        },
        url: {
            type: String,
            required: true
        },
        clickable: {
            type: Boolean,
            default: true
        },
        acceptedFileTypes: {
            type: String
        },
        thumbnailHeight: {
            type: Number,
            default: 150
        },
        thumbnailWidth: {
            type: Number,
            default: 150
        },
        showRemoveLink: {
            type: Boolean,
            default: true
        },
        maxFileSizeInMb: {
            type: Number,
            default: 2
        },
        maxNumberOfFiles: {
            type: Number,
            default: 5
        },
        autoProcessQueue: {
            type: Boolean,
            default: true
        },
        useCustomDropzoneOptions: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Object,
            default: () => { return {} }
        },
        dropzoneOptions: {
            type: Object
        },
        existing: {
            type: [Object, Array]
        }
    },

    mounted () {
        this.$nextTick(() => {
            this.loadDropzone()
            this.preload()
        })
    },

    data () {
        return {
            dropzone: null
        }
    },

    computed: {
        id () {
            return this.makeVfUuid()
        },

        rootId () {
            return this.$slots['button'] ? this.makeVfUuid() : this.id
        },

        __dzOptoions () {
            var opts = {
                url: this.url,
                accept: this.accept,
                clickable: this.clickable,
                headers: this.headers,
                thumbnailWidth: this.thumbnailWidth,
                thumbnailHeight: this.thumbnailHeight,
                maxFiles: this.maxNumberOfFiles,
                maxFilesize: this.maxFileSizeInMb,
                dictRemoveFile: 'Remove',
                addRemoveLinks: this.showRemoveLink,
                acceptedFiles: this.acceptedFileTypes,
                autoProcessQueue: this.autoProcessQueue,
                dictDefaultMessage: '<i class="fa fa-2x fa-cloud-upload" aria-hidden="true"></i><br>Drop files here to upload'
            }

            if (this.$slots['button']) {
                opts.previewTemplate = '<span hidden></span>'
            }
            return opts
        }
    },

    methods: {

        accept (file, done) {
            if (this.dropzone.files.length > this.maxNumberOfFiles) {
                done('You cannon upload any more files')
                setTimeout(() => {
                    this.dropzone.removeFile(file)
                }, 5000)
            }
            done()
        },

        loadDropzone () {
            var element = document.getElementById(this.id)

            if (this.dropzone) {
                this.dropzone.destroy()
            }

            // console.log("loading dz with max number of files", this.maxNumberOfFiles);
            if (!this.useCustomDropzoneOptions) {
                this.dropzone = new Dropzone(element, this.__dzOptoions)
            } else {
                this.dropzone = new Dropzone(element, this.dropzoneOptions)
            }

            // Handle the dropzone events
            var self = this
            this.dropzone.on('addedfile', function (file) {
                self.$emit('added', file)
            })

            this.dropzone.on('maxfilesexceeded', function (file) {
                setTimeout(() => {
                    this.removeFile(file)
                }, 5000)
            })

            this.dropzone.on('removedfile', function (file) {
                console.log('removed File')
                self.$emit('removed', file)
            })

            this.dropzone.on('totaluploadprogress', (progress, bytesTotal, bytesSent) => {
                this.$emit('progress', progress, bytesTotal, bytesSent)
            })

            this.dropzone.on('success', function (file, response) {
                file.id = response.id
                self.$emit('success', response)
            })

            this.dropzone.on('error', function (file, error, xhr) {
                if (error.message) {
                    window.$(file.previewElement).find('.dz-error-message').text(error.message)
                }

                setTimeout(() => {
                    this.removeFile(file)
                }, 5000)

                self.$emit('error', file, error, xhr)
            })
        },

        _getPreloadImage (file) {
            let img
            if (file.image) {
                img = file.image.sm || file.image.default
                if (img) return img
            }

            if (file.thumbnail) {
                img = file.thumbnail.sm || file.thumbnail.default
                if (img) return img
            }
        },

        preload () {
            if (!this.existing || !this.dropzone) {
                return
            }

            var add = (file) => {
                var mockFile = {
                    name: file.name || file.filename,
                    size: file.filesize,
                    id: file.id,
                    status: 'success',
                    processing: false
                }

                this.dropzone.emit('addedfile', mockFile)
                this.dropzone.emit('thumbnail', mockFile, this._getPreloadImage(file))
                this.dropzone.files.push(mockFile)

                mockFile.previewElement.classList.add('dz-complete')
            }

            if (this.existing instanceof Array) {
                for (var i = this.existing.length - 1; i >= 0; i--) {
                    add(this.existing[i])
                }
            } else {
                add(this.existing)
            }
        }
    },

    events: {
        removeAllFiles: function () {
            this.dropzone.removeAllFiles(true)
        },
        processQueue: function () {
            this.dropzone.processQueue()
        }
    }
}

</script>

<style>
.dropzone .dz-preview .dz-image img {
    width: 100%;
}

@import url('~dropzone/dist/dropzone.css');
@import url('~dropzone/dist/basic.css');
</style>
