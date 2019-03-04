<template>
    <div class="panel panel-default vf-panel">
        <div :class="{movable, }" class="panel-heading clearfix" @click="isCollapsed = !isCollapsed">
            <div class="pull-left">
                <slot name="heading">
                    {{ heading }}
                </slot>
            </div>
            <div class="pull-right">
                <i
                    :class='isCollapsed ? "fa-caret-up" : "fa-caret-down"'
                    class="fa"
                    aria-hidden="true"/>
            </div>
        </div>

        <div
            :class="{ 'in': !isCollapsed }"
            class="panel-collapse collapse">
            <div class="panel-body">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        heading: {
            type: String,
            default: ''
        },

        collapsed: {
            type: Boolean,
            default: false
        },

        movable: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            isCollapsed: this.collapsed
        }
    }
}
</script>
