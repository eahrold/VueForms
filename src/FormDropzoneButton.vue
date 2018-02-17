<template>
    <div class="form-group upload">

        <transition name='fade'>
            <div v-if='id'>

                <div class="row">
                <label class="col-xs-12">{{ label }} </label>
                </div>

                <div class="row">
                    <div class="col-xs-8">
                        <vue-dropzone
                            :existing='value'
                            :url="requestEndpoint"
                            :accepted-file-types="acceptedFileTypes"
                            :headers='requestHeaders'
                            :max-number-of-files='limit'
                            :max-file-size-in-mb='maxFileSize'
                            @error="dzError"
                            @progress='progress = arguments[0]'
                            @success="dzAdded"
                            @removed="dzRemoved">
                            <template slot='button'>{{ btnText }}</template>
                        </vue-dropzone>
                        <span class="help-block">Limited to {{ limitText }}. Each file must not exceed {{ maxFileSize }}MB.</span>
                        <span v-if='helpText' class="help-block">{{ helpText }}</span>
                    </div>
                    <div class="col-xs-4 text-right">
                        <template v-if="!!$slots['thumbnail']">
                            <slot name='thumbnail'></slot>
                        </template>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <form-progress-bar :progress='progress'></form-progress-bar>
                    </div>
                </div>
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
    mixins: [ dropzone ],

    props: {
        btnText: {
            type: String,
            default: "Choose File"
        }
    },
}
</script>
