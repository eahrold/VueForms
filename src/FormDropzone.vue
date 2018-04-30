<template>
    <div class="form-group vf-form-group upload">
        <transition name='fade'>
            <div v-if='id'>
                <label>{{ label }}</label>
                <vue-dropzone
                    :existing='value'
                    :url="requestEndpoint"
                    :accepted-file-types="acceptedFileTypes"
                    :headers='requestHeaders'
                    :max-number-of-files='limit'
                    :max-file-size-in-mb='maxFileSize'
                    @error="dzError"
                    @success="dzAdded"
                    @removed="dzRemoved">
                </vue-dropzone>
                <small class="help-block form-text">{{ dzHelpText }}</small>
                <small v-if='helpText' class="help-block form-text">{{ helpText }}</small>
            </div>
            <div v-else>
                <small class="help-block form-text">File upload is available after initial save.</small>
            </div>
        </transition>
    </div>
</template>

<script>
import { dropzone } from './mixins'
export default {
    mixins: [ dropzone ]
}
</script>
