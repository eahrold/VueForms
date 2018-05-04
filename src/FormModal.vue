<template>
    <transition name="vf-modal">
        <div class="vf-modal-mask">
            <div class="vf-modal-wrapper">
                <div class="vf-modal-container">
                    <span
                        class="vf-modal-close close"
                        @click="$emit('close')">x</span>

                    <div
                        v-if="!!$slots.header"
                        class="vf-modal-header clearfix">
                        <h4>
                            <slot name="header"/>
                        </h4>
                    </div>

                    <div class="vf-modal-body clearfix">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div
                        v-if="!hideFooter"
                        class="vf-modal-footer clearfix">
                        <slot name="footer">
                            <button
                                class="btn btn-primary vf-modal-default-button"
                                @click="$emit('close')">Close</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
export default {
    props: {
        hideHeader: {
            type: Boolean,
            default: false
        },

        hideFooter: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            default: document.body.style.display
        }
    },

    beforeDestroy () {
        document.body.style.overflow = this.default
    },

    mounted () {
        document.body.style.overflow = 'hidden'
    }
}
</script>

<style lang='css' scoped>
@import url('styles/modal.css')
</style>
