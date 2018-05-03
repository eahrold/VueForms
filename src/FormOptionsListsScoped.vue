<template>
<div class="form-group col col-md-12">
    <!-- Lable  -->
    <div class="row">
        <slot name='label'>
            <div class="col-md-12"><label v-if='label'>{{ label }}</label></div>
        </slot>
    </div>
    <!-- End Label -->

    <!-- List Groups -->
    <div  class="col-sm-6">
        <small class="help-text">Current Items</small>
        <draggable class="value-container" :class='valueListClass' v-model="aValue" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group name="no" class="list-group draggable-list" tag="ul">
                <li class="list-group-item" v-for="item in aValue" :key="item.id">
                    <slot name='current' v-bind="item"></slot>
                </li>
            </transition-group>
        </draggable>
    </div>

    <div class="col-sm-6">
        <small class="help-text">Available Items</small>
        <transition name='fade'>
            <li v-if='showOptSearch' class="list-group-item"><input v-model='optSearch' class='form-control' placeholder="Search..."></li>
        </transition>

        <draggable class="value-container" :class='optionsListClass' :value="availableOptions" :options="dragOptions" :move="onMove">
            <transition-group name="no" class="list-group draggable-list" tag="ul">
                <li class="list-group-item" v-for="item in availableOptions" :key="item.id">
                    <slot name='available' v-bind="item"></slot>
                </li>
          </transition-group>
        </draggable>
    </div>
    <!-- End List Groups -->
</div>

</template>
<script>

const _ = require('lodash')

export default {

    props: {
        label: {
            type: String,
            required: true
        },

        valueKey: {
            type: String,
            required: false
        },

        textKey: {
            type: String,
            required: false
        },

        searchable: {
            type: Boolean,
            default: true
        },

        value: {
            type: Array,
            required: true
        },

        options: {
            type: Array,
            required: true
        },

        badgeKey: {
            type: String,
            required: false
        },

        group: {
            type: String,
            default: 'group'
        }
    },

    data () {
        return {
            aValue: null,
            aOptions: null,
            optSearch: null,
            editable: true,
            isDragging: false,
            delayedDragging: false
        }
    },

    mounted () {
        this.aValue = this.value.map((entry, index) => {
            return _.assign({}, entry, { order: index + 1, fixed: false })
        })
        this.aOptions = this.options
    },

    methods: {
        orderList () {
            this.aValue = this.aValue.sort((one, two) => { return one.order - two.order })
        },

        onMove ({relatedContext, draggedContext}) {
            const relatedElement = relatedContext.element
            const draggedElement = draggedContext.element
            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },

        elementDescription (element) {
            if (this.textKey) {
                return _.get(element, this.textKey, element.id)
            }
            return element.name || element.title || element.slug || element.id
        }
    },

    computed: {
        showOptSearch () {
            return !_.isEmpty(this.optSearch) || (!_.isEmpty(this.availableOptions) && (this.availableOptions.length >= 5))
        },

        optionsListClass () {
            return {
                'empty-drag-area': _.isEmpty(this.availableOptions)
            }
        },

        valueListClass () {
            return {
                'empty-drag-area': _.isEmpty(this.aValue)
            }
        },

        hasOptions () {
            return !_.isEmpty(this.availableOptions)
        },

        availableOptions () {
            const opts = _.differenceBy(this.aOptions, this.aValue, this.valueKey)
            if (!_.isEmpty(this.optSearch)) {
                return _.filter(opts, (opt) => {
                    return JSON.stringify(opt).indexOf(this.optSearch) !== -1
                })
            }
            return opts
        },

        dragOptions () {
            return {
                animation: 0,
                group: this.group,
                disabled: !this.editable,
                ghostClass: 'ghost'
            }
        }
    },

    watch: {
        aValue: {
            deep: true,
            handler (newValue) {
                this.$emit('input', newValue)
            }
        },

        isDragging (newValue) {
            if (newValue) {
                this.delayedDragging = true
                return
            }
            this.$nextTick(() => {
                this.delayedDragging = false
            })
        }
    }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i{
  cursor: pointer;
}

.empty-drag-area {
    min-height: 3em;
    /*height: 3em;*/
    background-color: #EEEEEE;
    border: 1px dashed lightgrey;
    text-align: center;
}

ul.list-group.draggable-list {
    z-index: 2;
    margin-bottom: 0;
}

.empty-drag-area:before {
    line-height: 3;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    content: "Drag Item Here";
    pointer-events: none;
}

.value-container {
    max-height: 220px;
    overflow: scroll;
}

</style>
