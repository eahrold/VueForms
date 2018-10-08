<style scoped lang="scss">
.dropdown-menu {
    width: 100%;
}

.dropdown-toggle {
    min-width: 208px;
    max-width: 100%;
    overflow-y: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-content-wrapper {
    max-height: 50vh;
    overflow-y: scroll;
}

.dropdown {

    .bs-caret .fa-caret-down {
        transition: .5s transform ease;
        transform: rotate(-90deg);
    }


    &.show {
        .bs-caret .fa-caret-down {
            transform: rotate(0deg);
        }
    }
}

.btn-left {
    text-align: left;
}

.dropdown-item {
    width: 100%;
    padding: 0;
    clear: both;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;

    .fa-check.pull-right {
        float: right
    }

    &:hover {
        background-color: darkgreen;

        > label {
            color: white !important;

            > span > i.fa-check {
                color: white !important;
            }
        }

        &.selected {
            background-color: darkred;
        }
    }

    .d-none {
        display: none;
    }

    > label {
        cursor: pointer;
        padding: 0.25rem 1.5rem;
        width: 100%;
        heigh: 100%;
    }
}

.form-group.search {
    padding: 5px;
}
</style>

<template>
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            v-if="label"
            class="control-label vf-control-label">{{ aLabel }}</label>
        <div class="dropdown">
            <button
                :id="vf_uid"
                class="btn btn-outline-secondary btn-default btn-block btn-left"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <slot name='selected' v-bind='{value,}'>{{ selectedText }}</slot>
                <span class="bs-caret pull-right">
                    <slot name="caret"><i
                        class="fa fa-caret-down"
                        aria-hidden="true"/></slot>
                </span>
            </button>

            <div
                :aria-labelledby="vf_uid"
                class="dropdown-menu">

                <div v-if='search' class="form-group search px-1">
                    <input
                        v-model="searchString"
                        class="form-control"
                        placeholder="Search...">
                </div>
                <form class="dropdown-content-wrapper">
                    <div
                        v-for="(opt, idx) in $_filtered"
                        :key="idx"
                        :class="optItemClass(opt, idx)"
                        class="dropdown-item">
                        <label
                            :for="`vf-sel-${vf_uid}-${idx}`"
                            :class="optLabelClass(opt, idx)">
                            <input
                                v-model="aValue"
                                class="d-none"
                                :id="`vf-sel-${vf_uid}-${idx}`"
                                :value="optionValue(opt, idx)"
                                :name="property"
                                :type="$_inputType">
                            <slot name='option-label' v-bind='{
                                option: opt, selected: $_isSelected(opt, idx)
                            }'>
                                <span>{{ optionDescription(opt) }}</span>
                            </slot>
                            <transition name='fade' :duration='0.5'>
                            <i  v-if="$_isSelected(opt, idx)"
                                class="fa fa-check pull-right"
                                aria-hidden="true"/>
                            </transition>
                        </label>
                    </div>
                </form>
            </div>
        </div>

        <form-errors
            v-if="displayErrors"
            v-bind="{errors, warning, property}"/>
        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </div>
</template>

<script>

import _ from 'lodash'
import { core, options } from './mixins'

export default {
    mixins: [ core, options ],
    props: {
        isSelected: {
            type: Function,
            required: false
        },

        search: {
            type: Boolean,
            default: true,
        },

        textKey: {
            type: String,
            default: 'text'
        },

        required: {
            type: Boolean,
            default: false
        },

        options: {
            type: [ Array, Object ],
            required: false
        },

        multiple: {
            type: Boolean,
            default: false
        },

        nullable: {
            type: Boolean,
            default: true
        },

        placeholder: {
            type: String,
            default: 'Please Select...'
        },

        hilightClass: {
            type: String,
            default: 'text-success'
        },

        maxDisplayItems: {
            type: Number,
            default: 3
        }
    },

    data () {
        return {
            aValue: this.value || this.$_defaultValue,
            searchString: ''
        }
    },

    computed: {
        $_inputType() {
            return this.multiple ? 'checkbox' : 'radio'
        },

        $_defaultValue() {
            return (this.multiple ? [] : null)
        },

        $_filtered () {
            if (_.isEmpty(this.searchString)) return this.options

            const regex = new RegExp(this.searchString, 'i')
            return _.filter(this.options, (opt) => {
                return JSON.stringify(opt).match(regex)
            })
        },


        selectedText () {
            if (!! this.$scopedSlots.selected) return;

            if (!_.isEmpty(this.aValue)) {
                if (!this.multiple) {
                    if(this.optionsIsArrayOfObjects) {
                        return _.find(this.options, {[this.valueKey]: this.aValue})[this.textKey]
                    }
                    if(_.isObject(this.aValue)){
                        return _.get(this.aValue, this.textKey)
                    }
                    return `${this.aValue}`
                } else {
                    let take = _.take(this.aValue, this.maxDisplayItems).map((item) => {

                        if(_.isObject(item)) {
                            return item[this.textKey]
                        }

                        if(!_.isObject(item)) {
                            if(this.optionsIsArrayOfObjects) {
                                return _.find(this.options, {[this.valueKey]: item})[this.textKey]
                            }
                            return item;
                        }

                        return _.get(this.options, item)
                    })

                    if (this.aValue.length > take.length) {
                        take.push(`(and ${this.aValue.length - take.length} more...)`)
                    }
                    return take.join(', ')
                }
            }
            return this.placeholder
        }
    },

    mounted () {
        this.$nextTick(() => {
            if (this.value) {
                this.aValue = this.value
            }
        })
    },

    methods: {
        optLabelClass (opt, idx) {
            return {
                [this.hilightClass]: this.$_isSelected(opt, idx)
            }
        },

        optItemClass (opt, idx) {
            return {
                'selected': this.$_isSelected(opt, idx)
            }
        },

        optIndex (opt, idx) {
            const key = this.useKeyAsValue ? idx : opt
            const index = _.indexOf(this.aValue, _.get(key, this.valueKey, key))

            return index
        },

        $_isMultipleSelected(opt, idx) {
            return (this.optIndex(opt, idx) !== -1)
        },

        $_isSingleSingleSelected(opt, idx) {
            const {aValue, valueKey} = this
            const optVal = _.get(opt, this.valueKey, opt)
            return (optVal === _.get(this.aValue, this.valueKey) || this.aValue === optVal)
        },

        $_isSelected (opt, idx) {
            if(this.isSelected) {
                return this.isSelected(opt, this.aValue)
            }

            return this.multiple
                ? this.$_isMultipleSelected(opt, idx)
                : this.$_isSingleSingleSelected(opt, idx)
        }
    }

}
</script>
