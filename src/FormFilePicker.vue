<template>
    <div class="form-group">
        <form-modal v-if='showModal' @close='showModal=false'>
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
        <button class='btn btn-default' @click='load'>{{ btnText }}</button>
        <span v-if='isImage(this.aValue)'><img class='img-thumbnail selected' style="height: 2.4em" :src="this.aValue"> {{ this.aValue }}</span>
        <span v-else-if='this.aValue'><i class="fa fa-file-o" aria-hidden="true"></i> {{ this.aValue }}</span>
    </div>
</template>

<script type="text/javascript">

import _ from 'lodash'

import { props, errors, values } from './Mixins';

const isImage = function(filename) {
    return (/\.(gif|jpe?g|tiff|png)$/i).test(filename)
}

export default {
    mixins: [ props, errors, values ],

    props: {
        endpoint: {
            type: String,
            required: false,
        },
        srcKey: {
            type: String,
            default: "path"
        },
        btnText: {
            type: String,
            default: "Choose a File"
        }
    },

    data() {
        return {
            errorMsg: null,
            showModal: false,
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
            if(_.isObject(file)){
                this.aValue = _.get(file, this.srcKey)
            } else if (_.isString(file)) {
                this.aValue = file
            }
            this.showModal = false;
        },

        load() {
            this.showModal = true
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
