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

.btn-left {
    text-align: left;
}

.dropdown-item {
    width: 100%;
    padding: 0.25rem 1.5rem;
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

    > label {
        width: 100%;
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
                {{ selected }}
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
                        v-for="(opt, idx) in _filtered"
                        :key="idx"
                        :class="optItemClass(opt, idx)"
                        class="dropdown-item">
                        <label
                            :for="`vf-sel-${vf_uid}-${idx}`"
                            :class="optLabelClass(opt, idx)">
                            <span>{{ optionDescription(opt) }} <i
                                v-if="isSelected(opt, idx)"
                                class="fa fa-check pull-right"
                                aria-hidden="true"/></span>
                            <input
                                v-if="multiple"
                                :id="`vf-sel-${vf_uid}-${idx}`"
                                v-model="aValue"
                                :value="optionValue(opt, idx)"
                                class="invisible"
                                name="property"
                                type="checkbox">
                            <input
                                v-else
                                :id="`vf-sel-${vf_uid}-${idx}`"
                                v-model="aValue"
                                :value="optionValue(opt, idx)"
                                class="invisible"
                                name="property"
                                type="radio">
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
            aValue: this.value || this._defaultValue,
            searchString: ''
        }
    },

    computed: {
        _defaultValue() {
            return (this.multiple ? [] : null)
        },

        _filtered () {
            if (_.isEmpty(this.searchString)) return this.options

            const regex = new RegExp(this.searchString, 'i')
            return _.filter(this.options, (opt) => {
                if(_.isString(opt)) {
                    return opt.match(regex)
                }
                return opt[this.textKey].match(regex)
            })
        },


        selected () {
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
                [this.hilightClass]: this.isSelected(opt, idx)
            }
        },

        optItemClass (opt, idx) {
            return {
                'selected': this.isSelected(opt, idx)
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
            console.log({opt, idx, aValue, valueKey})

            const optVal = _.get(opt, this.valueKey, opt)
            return (optVal === _.get(this.aValue, this.valueKey) || this.aValue === optVal)
        },

        isSelected (opt, idx) {
            return this.multiple
                ? this.$_isMultipleSelected(opt, idx)
                : this.$_isSingleSingleSelected(opt, idx)
        }
    }

}
</script>
