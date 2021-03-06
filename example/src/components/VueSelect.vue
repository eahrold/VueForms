<style scoped lang="scss">
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
</style>

<template>
<div class="form-group" :class='formClass'>
    <label v-if='label' class="control-label">{{ aLabel }}</label>
    <div class="dropdown">
      <button class="btn btn-light dropdown-toggle" type="button" :id="vf_uid" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ selected }}
      </button>
      <div class="dropdown-menu" :aria-labelledby="vf_uid">

        <div class="form-group px-1">
            <input class='form-control' placeholder="Search..." v-model='search'>
        </div>
        <form class='dropdown-content-wrapper'>
            <label class='dropdown-item' v-for='(opt, idx) in _filtered' :for='`vf-sel-${vf_uid}-${idx}`' :class='optClass(opt)'>{{ opt.text }}
                <input v-if='multiple' class="invisible" :id='`vf-sel-${vf_uid}-${idx}`' name='property' type='checkbox' v-model='aValue' :value='opt'>
                <input v-else class="invisible" :id='`vf-sel-${vf_uid}-${idx}`' name='property' type='radio' v-model='aValue' :value='opt'>
                <i v-if='isSelected(opt)' class="fa fa-check pull-right" aria-hidden="true"></i>
            </label>
        </form>
      </div>
    </div>

    <form-errors
        v-if='displayErrors'
        v-bind="{errors, warning, property}">
    </form-errors>
    <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
</div>
</template>

<script>
import { core } from 'vue-forms';

export default {
    mixins: [ core ],
    props: {
        keyBy: {
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
            default: "Please Select..."
        },

        hilightClass: {
            type: String,
            default: 'text-success'
        },

        maxDisplayItems: {
            type: Number,
            default: 3,
        }
    },

    data () {
        return {
            aValue: this.multiple ? [] : null,
            search: ''
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },

    computed: {
        _filtered() {
            if(!this.search)return this.options;

            const regex = new RegExp(this.search, "i")
            return _.filter(this.options, (opt)=>{
                return opt[this.keyBy].match(regex)
            })
        },

        selected() {
            if (!_.isEmpty(this.aValue)) {
                if( ! this.multiple) {
                    return this.aValue[this.keyBy];
                }

                let take = _.take(this.aValue, this.maxDisplayItems).map((item)=>{return item[this.keyBy]})
                if(this.aValue.length > take.length) {
                    take.push(`(and ${this.aValue.length - take.length} more...)`)
                }
                return take.join(', ')
            }

            return this.placeholder;
        }
    },

    methods: {
        optClass(opt) {
            return {
                [this.hilightClass] : this.isSelected(opt)
            }
        },

        optIndex(opt) {
            return _.findIndex(this.aValue, opt)
        },

        isSelected(opt) {
            return this.multiple ?
                (this.optIndex(opt) !== -1) :
                opt[this.keyBy] === this.value[this.keyBy]

        },
    },

}
</script>