<template>
    <div class="form-group">
        <label v-if='label' :for='vf_uid'>{{ label }}:</label>
        <p v-if="showInfo" class="help-block">
            <small>For information on Markdown syntax, <a href="https://simplemde.com/markdown-guide" target="_blank">click here</a></small>
        </p>
        <textarea :id="vf_uid" v-model='aValue'></textarea>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block">
            <small><slot name='help'></slot></small>
        </p>
    </div>
</template>


<script>

import { core } from './Mixins';
import _ from 'lodash';

const SimpleMDE = require('simplemde');

export default {
    mixins: [ core ],

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
            element: document.getElementById(this.vf_uid),
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
