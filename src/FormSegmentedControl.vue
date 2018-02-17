<template>
    <div class="segmented-control" style="width: 100%">
        <template v-for='(opt, idx) in options'>
            <input v-model='aValue' :value='idx' type="radio" :name="'sc-1-'+uniq" :id="'sc-1-'+uniq+'-'+idx" checked>
        </template>

        <template v-for='(opt, idx) in options'>
            <label :for="'sc-1-'+uniq+'-'+idx" :data-value="opt">{{ opt }}</label>
        </template>
    </div>
</template>

<script>

import { props, errors, watchers, options } from './Mixins';

export default {
    mixins: [ props, errors, watchers, options ],

    props: {
        color: {
            type: String,
            default: "#1B5293"
        }
    },

    data () {
        return {
            aValue: 0,
            uniq: Math.round(Math.random() * (99999-10000) + 10000)
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    },
}
</script>