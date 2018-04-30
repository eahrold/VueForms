<template>
<!--
Date Range Picker Component

Usage:
<form-daterange
   :start.sync='start_prop'
   :end.sync='end_prop'
   :properties="['start_prop', 'end_prop']"
   label='Some Label'>
</form-daterange>
 -->
    <div class="form-group vf-form-group" :class='formClass'>
        <label class="control-label vf-control-label" :for='vf_uid'>{{ label }}: </label>
        <div class="input-group vf-input-group">
            <input
                v-bind='$attrs'
                v-on='$listeners'
                :id='vf_uid'
                :name="label"
                :style='inputStyle'
                :class='inputClass'
                @blur='onBlur'
                @focus='onFocus'
                type="text"
                class='form-control vf-form-control'/>
            <a @click.prevent.stop='clear' class="input-group-addon input-group-prepend vf-input-group-addon vf-date-addon">
                <span class="input-group-text">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                </span>
            </a>
        </div>
        <form-errors v-for='(property, idx) in properties' :key='idx' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>
<script>

var $ = require('jquery');
require('bootstrap-daterangepicker');
var moment = require('moment');

import { errors, dates, styles, vf_uid } from './mixins';

export default {
    mixins: [ errors, dates, styles, vf_uid ],

    props: {
        properties: {
            type: Array,
            default: ()=>{ return []},
        },

        label: {
            type: String,
        },

        start : {
            type: String,
        },

        end : {
            type: String,
        },

        errors: {
            type: Object,
            required: false
        },

        rules: {
            type: [Array, Function, Boolean],
            default: true,
        }
    },

    data () {
        return {
            picker: null,
            rootPicker: null,
            range: null,
        }
    },

    mounted () {
        this.$nextTick(()=>{
            this.load();
        });
    },

    computed: {
        ranges() {
            return {
                "Today": [
                    moment().toDate(),
                    moment().toDate()
                ],
                "Yesterday": [
                    moment().subtract(1, 'days').toDate(),
                    moment().subtract(1, 'days').toDate(),
                ],
                "Past week": [
                    moment().subtract(1, 'week').toDate(),
                    moment().toDate()
                ],
                "Past Month": [
                    moment().subtract(1, 'months').toDate(),
                    moment().toDate()
                ],
                "Past Year": [
                    moment().subtract(1, 'years').toDate(),
                    moment().toDate()
                ]
            }
        },

        isValid() {
            if (!this.required) return true;
            return (!!this.start && moment(this.start).isValid()) && (!!this.end && moment(this.end).isValid())
        }
    },

    methods : {
        $_emitDates(start, end) {
            this.$emit('update:start', this.$_makeFormattedDate(start));
            this.$emit('update:end', this.$_makeFormattedDate(end));
        },

        load () {

            var options = {
                locale: {
                    cancelLabel: 'Clear',
                    format: this.pickerLocaleFormat,
                },
                autoUpdateInput: this.autoApply,
                timePicker: this.timePicker,
                timePickerIncrement: this.timePickerIncrement,
            }

            if(this.showRanges) {
                options.ranges = this.ranges
            }

            var invalid = false;
            if(this.start) {
                const startDate = moment(this.start);
                if (startDate.isValid()) options.startDate = startDate
            } else invalid = true

            if(this.end) {
                const endDate = moment(this.end);
                if (endDate.isValid()) options.endDate = endDate
            } else invalid = true

            const config = _.assign({}, options, this.dateConfig)

            this.rootPicker = $('#'+this.vf_uid).daterangepicker(
                config,
            (start, end, label) => {
                this.$_emitDates(start, end);
            }).on('cancel.daterangepicker', (ev, picker)=>{
                this.clear();
            }).on('apply.daterangepicker', (ev, picker)=>{
                this.$_emitDates(picker.startDate, picker.endDate);
            });

            if (invalid) {this.rootPicker.val('')}

            this.picker = this.rootPicker.data('daterangepicker')
        },

        clear() {
            this.$_emitDates(null, null)
            this.rootPicker.val('');
        },
    },

    watch : {
        timePicker(change){
            this.load()
            this.$_emitDates(moment(this.start), moment(this.end));
        },

        start (change) {
            this.updateStart(moment(change))
            if( change === null ) {
                this.rootPicker.val('');
            }
        },

        end (change) {
            this.updateEnd(moment(change))
            if( change === null ) {
                this.rootPicker.val('');
            }
        }
    }
}
</script>

<style lang='css'>
    @import url('~bootstrap-daterangepicker/daterangepicker.css')
</style>