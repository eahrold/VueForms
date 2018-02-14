<template>
    <div class="panel panel-default">
        <div @click='isCollapsed = !isCollapsed' class='panel-heading clearfix' :class="{movable, movable}">
            <div class="pull-left"><slot name='heading'>
                {{ heading }}
            </slot>
            </div>
            <div class="pull-right">
                <i class="fa" :class='isCollapsed ? "fa-caret-up" : "fa-caret-down"' aria-hidden="true"></i>
            </div>
        </div>

        <div class='panel-collapse collapse' :class="{ 'in': !isCollapsed }">
            <div class="panel-body">
                <slot></slot>
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

    data() {
        return {
            isCollapsed: this.collapsed,
        }
    },
}
</script>