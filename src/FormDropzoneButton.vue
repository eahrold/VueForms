<template>
    <div class="form-group upload">

        <transition name='fade'>
            <div v-if='id'>

                <div class="row">
                    <label class="col-xs-12">{{ label }} </label>
                </div>

                <div class="row">
                    <div class="col-xs-3">
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
                    </div>
                    <div class="col-xs-9">
                        <form-progress-bar :progress='progress'></form-progress-bar>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <span class="help-block">{{ dzHelpText }}</span>
                        <span v-if='helpText' class="help-block">{{ helpText }}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <template v-if="!!$slots['thumbnail']">
                            <slot name='thumbnail'></slot>
                        </template>
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
import { dropzone } from './mixins'

export default {
    mixins: [ dropzone ],

    props: {
        btnText: {
            type: String,
            default: "Upload File"
        }
    },
}
</script>
