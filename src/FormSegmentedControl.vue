<template>
    <div>
        <div class="segmented-control" :class='`text-${type}`'>
            <template v-for='(opt, idx) in options'>
                <input :key='`sc-input-${idx}`' v-model='aValue' :value='idx' type="radio" :name="property" :id="`sc-${vf_uid}-${idx}`">
            </template>

            <template v-for='(opt, idx) in options'>
                <label :key='`sc-label-${idx}`' :for="`sc-${vf_uid}-${idx}`" :data-value="opt">{{ opt }}</label>
            </template>
        </div>
    </div>
</template>

<script>

import { core, options } from './mixins'

export default {
    mixins: [ core, options ],

    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },

    data () {
        return {
            aValue: this.value || 0
        }
    }

}
</script>

<style lang='css' scoped>
@import url('styles/segmented-control.css')
</style>
