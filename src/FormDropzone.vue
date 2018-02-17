<template>
    <div class="form-group upload">
        <transition name='fade'>
            <div v-if='id'>
                <label>{{ label }} </label>
                <vue-dropzone
                    :existing='value'
                    :url="requestEndpoint"
                    :accepted-file-types="acceptedFiletypes"
                    :headers='requestHeaders'
                    :max-number-of-files='limit'
                    :max-file-size-in-mb='maxFileSize'
                    @error="dzError"
                    @success="dzAdded"
                    @removed="dzRemoved">
                </vue-dropzone>
                <span class="help-block">Limited to {{ limitText }}. Each file must not exceed {{ maxFileSize }}MB.</span>
                <span v-if='helpText' class="help-block">{{ helpText }}</span>
            </div>
            <div v-else>
                <span class="help-block">File upload is available after initial save.</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { dropzone } from './Mixins'
export default {
    mixins: [ dropzone ]
}
</script>
