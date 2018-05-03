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
<div class="form-group vf-form-group" :class='formClass'>
    <label v-if='label' class="control-label vf-control-label">{{ aLabel }}</label>
    <div class="dropdown">
      <button class="btn btn-outline-secondary btn-default btn-block" type="button" :id="vf_uid" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ selected }}
        <span class="bs-caret pull-right">
            <slot name='caret'><i class="fa fa-caret-down" aria-hidden="true"></i></slot>
        </span>
      </button>

      <div class="dropdown-menu" :aria-labelledby="vf_uid">

        <div class="form-group search px-1">
            <input class='form-control' placeholder="Search..." v-model='search'>
        </div>
        <form class='dropdown-content-wrapper'>
            <div class='dropdown-item' v-for='(opt, idx) in _filtered' :key='idx' :class='optItemClass(opt)'>
            <label :for='`vf-sel-${vf_uid}-${idx}`' :class='optLabelClass(opt)'>
                <span>{{ opt[textKey] }} <i v-if='isSelected(opt)' class="fa fa-check pull-right" aria-hidden="true"></i></span>
                <input v-if='multiple' class="invisible" :id='`vf-sel-${vf_uid}-${idx}`' name='property' type='checkbox' v-model='aValue' :value='opt'>
                <input v-else class="invisible" :id='`vf-sel-${vf_uid}-${idx}`' name='property' type='radio' v-model='aValue' :value='opt'>
            </label>
            </div>
        </form>
      </div>
    </div>

    <form-errors
        v-if='displayErrors'
        v-bind="{errors, warning, property}">
    </form-errors>
    <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
</div>
</template>

<script>
import _ from 'lodash'
import { core } from './mixins'

export default {
    mixins: [ core ],
    props: {
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
            aValue: this.multiple ? [] : null,
            search: ''
        }
    },

    mounted () {
        this.$nextTick(() => {
            if (this.value) {
                this.aValue = this.value
            }
        })
    },

    computed: {
        _filtered () {
            if (!this.search) return this.options

            const regex = new RegExp(this.search, 'i')
            return _.filter(this.options, (opt) => {
                return opt[this.textKey].match(regex)
            })
        },

        selected () {
            if (!_.isEmpty(this.aValue)) {
                if (!this.multiple) {
                    let text = _.get(this.aValue, this.textKey)
                    if (text) return text
                } else {
                    let take = _.take(this.aValue, this.maxDisplayItems).map((item) => { return item[this.textKey] })
                    if (this.aValue.length > take.length) {
                        take.push(`(and ${this.aValue.length - take.length} more...)`)
                    }
                    return take.join(', ')
                }
            }
            return this.placeholder
        }
    },

    methods: {
        optLabelClass (opt) {
            return {
                [this.hilightClass]: this.isSelected(opt)
            }
        },

        optItemClass (opt) {
            return {
                'selected': this.isSelected(opt)
            }
        },

        optIndex (opt) {
            return _.findIndex(this.aValue, opt)
        },

        isSelected (opt) {
            return this.multiple
                ? (this.optIndex(opt) !== -1)
                : opt[this.textKey] === _.get(this.value, this.textKey)
        }
    }

}
</script>
