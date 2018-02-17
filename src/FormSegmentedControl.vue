<template>
    <div class="segmented-control" style="width: 100%">
        <template v-for='(opt, idx) in options'>
            <input v-model='aValue' :value='idx' type="radio" :name="'sc-1-'+vf_uid" :id="'sc-1-'+vf_uid+'-'+idx" checked>
        </template>

        <template v-for='(opt, idx) in options'>
            <label :for="'sc-1-'+vf_uid+'-'+idx" :data-value="opt">{{ opt }}</label>
        </template>
    </div>
</template>

<script>

import { props, errors, values, options, uuid } from './Mixins';

export default {
    mixins: [ props, errors, values, options ],

    props: {
        color: {
            type: String,
            default: "#1B5293"
        }
    },

    data () {
        return {
            aValue: 0,
        }
    },
}
</script>