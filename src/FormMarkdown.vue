<template>
    <div class="form-group">
        <label v-if='label' :for='element'>{{ label }}:</label>
        <p v-if="showInfo" class="help-block">
            <small>For information on Markdown syntax, <a href="https://simplemde.com/markdown-guide" target="_blank">click here</a></small>
        </p>
        <textarea :id="element" v-model='aValue'></textarea>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>


<script>

import { props, errors, watchers } from './Mixins';
import _ from 'lodash';

const SimpleMDE = require('simplemde');

export default {
    mixins: [ props, errors, watchers ],

    props: {
        showInfo: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            aValue: this.value,
            simplemde: null,
            element: 'markdown-' + Math.floor(Math.random() * 9999)
        }
    },

    watch: {
        value(newValue, oldVal) {
            if(typeof newValue !== 'string') return;

            if (newValue != this.simplemde.value()) {
                this.simplemde.value(newValue);
            }
        }
    },

    mounted () {
        const props = _.assign({}, this.options, {
            element: document.getElementById(this.element),
            forceSync: false,
            initialValue: this.value,
        })

        const simplemde = this.simplemde = new SimpleMDE(props);
        simplemde.codemirror.on("change", ()=>{
            this.$emit('input', simplemde.value())
        });

    }
}
</script>

<style type="text/css" scoped>
    @import url('~simplemde/dist/simplemde.min.css');
</style>
