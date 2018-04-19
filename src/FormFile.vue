<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <input type="file" :name="property" :id="property" :multiple="multiple" :accept='_accept' @change="processFile($event)">
        <small v-if='showAttached'>Current {{ pluralized }}: {{ currentFile }}</small>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>

<script>
/**
 * Notes:
 * If multiple is set to true, this will add a FileList
 * as the value
 * https://developer.mozilla.org/en-US/docs/Web/API/FileList
 *
 * When I need to have a direct file upload on a form, I'll usually
 * do somehting like this
 *

    makeFormData() {
        const formData = new FormData()
        _.forOwn(this.model, (value, key)=>{
            if (value instanceof FileList) {
                _.each(value, (file)=>{
                    formData.append(`${key}[]`, file);
                })
            } else {
                formData.append(key, value);
            }
        })
        return formData
    },
 *
 *
 *
 * !!!!!! And Remember !!!!!!!!!!!
 * multi-part FormData will not "PUT", to update, you need to
 * you'll want to do a POST request and add method spoofing
 * formData.append('_method', 'put');
 */

import _ from 'lodash'
import { core } from './mixins'
import { fileTypes } from './data_sources'

export default {
    name: 'form-file',

    mixins: [ core ],

    props : {
        multiple: {
            type: Boolean,
            default: false
        },

        accept: {
            type: [String, Array],
            default: ()=>{ return fileTypes.any }
        },

        showAttached: {
            type: Boolean,
            default: true,
        }
    },

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
    },

    computed: {
        pluralized() {
            if(this.multiple) {
                return (_.get(this.aValue, 'length') > 1) ? "Files" : "File"
            }
            return 'File'
        },

        _accept() {
            if(_.isString(this.accept))return this.accept;
            return this.accept.join(',')
        },

        currentFile() {

            if( ! this.multiple ) return this.fileToString(this.aValue);

            return _.map(this.aValue, (file)=>{
                return this.fileToString(file)
            }).join(', ')
        },

        validated() {
            if(this.required) {
                return !!this.aValue
            }
            return true
        },
    },

    methods: {
        fileToString(file) {
            if(_.isString(file)) return file
            return _.get(file, 'name', _.get(file,'path'))
        },

        processFile(event) {
            console.log(event.target.files);
            if(this.multiple) {
                this.aValue = event.target.files
            } else {
                this.aValue = event.target.files[0]
            }
        }
    }
}
</script>