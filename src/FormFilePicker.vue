<template>
    <div class="form-group">
        <form-file-gallery
            v-if='showModal'
            v-bind='{srcKey, endpoint, headers}'
            @choose='choose'
            ></form-file-gallery>

        <button class='btn btn-default' @click='open'>{{ btnText }}</button>
        <span v-if='isImage(this.aValue)'><img class='img-thumbnail selected' style="height: 2.4em" :src="this.aValue"> {{ this.aValue }}</span>
        <span v-else-if='this.aValue'><i class="fa fa-file-o" aria-hidden="true"></i> {{ this.aValue }}</span>
    </div>
</template>

<script type="text/javascript">

import _ from 'lodash'

import { core } from './mixins';
import FormFileGallery from './FormFileGallery'

export default {
    mixins: [ core ],
    components: {
        'form-file-gallery': FormFileGallery,
    },

    props: {
        headers: {
            type: String,
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


    methods: {
        open() {
            this.showModal = true
        },

        isImage(filename) {
            return _.isString(filename) && (/\.(gif|jpe?g|tiff|png)$/i).test(filename)
        },

        choose(file) {
            if(_.isObject(file)){
                this.aValue = _.get(file, this.srcKey)
            } else if (_.isString(file)) {
                this.aValue = file
            }
            this.showModal = false;
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
