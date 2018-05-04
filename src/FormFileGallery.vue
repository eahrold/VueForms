<template>
    <form-modal @close="$emit('close')">
        <div
            slot="body"
            class="row">
            <transition name="fade">
                <div
                    v-if="errorMsg"
                    class="col-md-12 alert alert-danger alert-dismissible text-center"
                    role="alert">
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="errorMsg=null">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>{{ errorMsg }}</h3>
                </div>
            </transition>

            <transition
                name="fade"
                mode="out-in">
                <div
                    v-if="selected"
                    key="meta"
                    class="row">
                    <form-file-edit
                        v-model="selected"
                        :src="fileSrc(selected)"
                        property="selected">
                        <div
                            slot="after"
                            class="text-right">
                            <button
                                class="btn btn-default"
                                @click="selected = null">Back</button>
                            <button
                                class="btn btn-primary ml-1"
                                @click="complete(selected)">Insert</button>
                        </div>
                    </form-file-edit>
                </div>
                <div
                    v-else
                    key="gallery"
                    class="row">
                    <div
                        v-if="pagedFiles.length"
                        class="col-xs-12 text-right">
                        <ul class="pagination">
                            <li
                                :class="{disabled: !hasPrev}"
                                class="page-item">
                                <a
                                    href="javascript:void(0)"
                                    class="page-link"
                                    @click.prevent.stop="pagePrev">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="">Previous</span>
                                </a>
                            </li>
                            <li
                                :class="{disabled: !hasNext}"
                                class="page-item">
                                <a
                                    href="javascript:void(0)"
                                    class="page-link"
                                    @click.prevent.stop="pageNext" >
                                    <span class="">Next</span>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div
                        v-for="(file, idx) in pagedFiles"
                        :key="idx"
                        class="col-md-4 text-center"
                        @click="choose(file, $event)">
                        <form-panel>
                            <img
                                v-if="isImage(fileSrc(file))"
                                :src="fileSrc(file)"
                                class="img-thumbnail gallery">
                            <i
                                v-else
                                style="font-size: 3em"
                                class="fa fa-file-o fa-3x"
                                aria-hidden="true"/>
                            <p>{{ fileSrc(file) }}</p>
                        </form-panel>
                    </div>
                    <div class="col-xs-12 text-center">
                        <h4 class="help-text help-block"> {{ offset + 1 }} - {{ offset + limit }} of {{ files.length }}</h4>
                    </div>
                </div>
            </transition>
        </div>
    </form-modal>
</template>

<script type="text/javascript">

import _ from 'lodash'

export default {

    props: {
        headers: {
            type: Object,
            required: false
        },
        endpoint: {
            type: String,
            required: false
        },
        srcKey: {
            type: String,
            default: 'path'
        },
        addMeta: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            errorMsg: null,
            files: [],
            pagination: {},
            selected: null,
            page: 1,
            limit: 20
        }
    },

    computed: {
        requestEndpoint () {
            return this.endpoint || (this.$vfconfig ? this.$vfconfig.filesEndpoint() : null)
        },

        requestHeaders () {
            return this.headers || _.get(this.$vfconfig, 'headers', {})
        },

        pagedFiles () {
            return this.files.slice(this.offset, this.offset + this.limit)
        },

        offset () {
            return (this.page - 1) * this.limit
        },

        hasNext () {
            const { page, limit, files } = this
            return ((page + 1) * limit) <= _.get(files, 'length', 0)
        },

        hasPrev () {
            return this.page > 1
        }
    },

    mounted () {
        this.load()
    },

    methods: {
        isImage (filename) {
            return _.isString(filename) && (/\.(gif|jpe?g|tiff|png)$/i).test(filename)
        },

        fileSrc (file) {
            if (_.isObject(file)) {
                return _.get(file, this.srcKey)
            } else if (_.isString(file)) {
                return file
            }
        },

        choose (file, event) {
            if (this.addMeta) {
                const size = {
                    width: event.target.naturalWidth,
                    height: event.target.naturalHeight,
                    constrain: true
                }
                const selected = this.selected = _.assign(size, file)
                return selected
            }
            this.complete(file)
        },

        complete (file) {
            this.$emit('choose', file)
            this.$emit('close')
        },

        pageNext () {
            const { page } = this
            if (this.hasNext) {
                this.page = page + 1
            }
        },

        pagePrev () {
            if (this.hasPrev) {
                this.page = this.page - 1
            }
        },

        load () {
            if (!_.isEmpty(this.files)) return

            var request = new XMLHttpRequest()
            request.onload = ({target}) => {
                this.files = JSON.parse(target.responseText)
            }
            request.onerror = ({target}) => {
                this.errorMsg = 'Error error loading files'
            }

            request.open('GET', this.requestEndpoint, true)
            _.each(this.requestHeaders, (value, key) => {
                request.setRequestHeader(key, value)
            })
            request.send()
        }

    }
}
</script>

<style lang="css" scoped>
.ml-1 {
    margin-left: 1em;
}

/*.img-thumbnail.gallery {}*/

@import url('./styles/transitions.css')
</style>
