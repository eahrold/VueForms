<template>
    <form-modal @close='$emit("close")'>
        <div slot='body' class="row">
            <transition name='fade'>
            <div class='col-md-12 alert alert-danger alert-dismissible text-center' v-if='errorMsg' role='alert'>
                <button type="button" class="close" @click='errorMsg=null' aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3>{{ errorMsg }}</h3>
            </div>
            </transition>

            <div v-for='(file, idx) in files' @click='choose(file)' :key='idx' class="col-md-4 text-center">
                <form-panel>
                    <img v-if='isImage(fileSrc(file))' class='img-thumbnail gallery' :src="fileSrc(file)">
                    <i style='font-size: 3em' class="fa fa-file-o fa-3x" v-else aria-hidden="true"></i>
                    <p>{{ fileSrc(file) }}</p>
                </form-panel>
            </div>
        </div>
    </form-modal>
</template>

<script type="text/javascript">

import _ from 'lodash'

export default {
    props: {
        headers: {
            type: Object,
            required: false,
        },
        endpoint: {
            type: String,
            required: false,
        },
        srcKey: {
            type: String,
            default: "path"
        },
    },

    data() {
        return {
            errorMsg: null,
            files: [],
            pagination: {}
        }
    },

    computed: {
        requestEndpoint() {
            return this.endpoint || (!!this.$vfconfig ? this.$vfconfig.filesEndpoint() : null)
        },

        requestHeaders() {
            return this.headers || _.get(this.$vfconfig, 'headers', {})
        }
    },

    mounted() {
        this.load()
    },

    methods: {
        isImage(filename) {
            const test = (/\.(gif|jpe?g|tiff|png)$/i).test(filename)
            console.log("TESTING", filename, test)
            return _.isString(filename) && test
        },

        fileSrc(file) {
            if (_.isObject(file)) {
                return _.get(file, this.srcKey)
            } else if (_.isString(file)) {
                return file;
            }
        },

        choose(file) {
            let value = null;
            if(_.isObject(file)){
                value = _.get(file, this.srcKey)
            } else if (_.isString(file)) {
                value = file
            }
            this.$emit('choose', value)
            this.$emit('close')
        },

        load() {
            if(!_.isEmpty(this.files))return;

            var request = new XMLHttpRequest()
            request.onload=({target})=>{
                console.log("RT", target.responseText);
                this.files = JSON.parse(target.responseText)
            };
            request.onerror=({target})=>{
                this.errorMsg = "Error error loading files"
            };

            request.open("GET", this.requestEndpoint, true);
            _.each(this.requestHeaders, (value, key)=>{
                request.setRequestHeader(key, value)
            })
            request.send();
        },

    },
}
</script>

<style lang="css" scoped>
.img-thumbnail.gallery {}

.img-thumbnail.selected {
    max-height: 50px;
}
</style>
