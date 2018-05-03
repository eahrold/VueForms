<template>
    <div class="panel" :class='panelClass'>
        <div v-if='hasHeaderSlot' class="panel-heading"><h4><slot name='heading'></slot></h4></div>
        <div class="panel-body"><slot></slot></div>
        <div v-if='hasFooterSlot' class="panel-footer"><slot name='footer'></slot></div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default'
        }
    },

    computed: {
        panelClass () {
            return 'panel-' + this.type
        },

        hasFooterSlot () {
            return !!this.$slots['footer']
        },

        hasHeaderSlot () {
            return !!this.$slots['heading']
        }
    }
}
</script>
