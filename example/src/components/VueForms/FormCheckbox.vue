<template>
    <div class="form-group" :class='formClass'>
        <div class="checkbox">
            <label class="control-label" :for="'checkbox-' + property">
                <input v-model='aValue'
                   :id="'checkbox-' + property"
                   type="checkbox">{{ aLabel }}
            </label>
        </div>
    </div>
</template>

<script>

import { props, errors, watchers } from './FormElementMixins';

export default {
    mixins: [ props, errors, watchers ],

    data () {
        return {
            aValue: null
        }
    },

    mounted () {
        this.$nextTick(()=>{
            if(this.value) {
                this.aValue = this.value;
            }
        });
    }
}
</script>
