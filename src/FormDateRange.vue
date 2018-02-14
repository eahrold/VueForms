/**
 *  Date Range Picker Component
 *
 *  Usage:
 *   <form-daterange
 *      :start='start_prop'
 *      @start='start_prop = arguments[0]'
 *      :end='end_prop'
 *      @end='end_prop = arguments[0]'
 *      :properties="['start_prop', 'end_prop']"
 *      label='Some Label'>
 *   </form-daterange>
 *
 */


<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='label'>{{ label }}: </label>
        <div class="input-group">
            <input class='form-control' :id='id' type="text" :name="label"/>
            <span @click='clear' class="input-group-addon">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
            </span>
        </div>
        <form-errors v-for='(property, idx) in properties' :key='idx' :errors='errors' :property='property'></form-errors>
        <p v-if="!!$slots['help']" class="help-block"><small><slot name='help'></slot></small></p>
    </div>
</template>
<script>

var $ = require('jquery');
var moment = require('moment');
require('bootstrap-daterangepicker');

import { errors, dates } from './FormElementMixins';

export default {
    mixins: [ errors, dates ],

    props: {
        properties: {
            type: Array,
            default: ()=>{ return []},
        },

        errors: {
            type: Object,
            required: false
        },

        start : {
            type: String,
        },

        end : {
            type: String,
        },

        label: {
            type: String,
        },

        timePicker: {
            type: Boolean,
            default: false,
        },

        timePickerIncrement: {
            type: Number,
            default: 15
        },

        autoApply: {
            type: Boolean,
            default: true,
        },

        showRanges: {
            type: Boolean,
            default: true
        },

        rules: {
            type: [Array, Function, Boolean],
            default: true,
        }
    },

    data () {
        return {
            id: 'daterange-' + Math.floor(Math.random() * 9999),
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
        load () {
            var format = 'MM/DD/YYYY'
            if(this.timePicker) {
                format += ' h:mm A'
            }

            var options = {
                locale: {
                    cancelLabel: 'Clear',
                    format,
                },
                // autoApply: this.autoApply,
                autoUpdateInput: this.autoApply,
                timePicker: this.timePicker,
                timePickerIncrement: this.timePickerIncrement,
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

            this.rootPicker = $('#'+this.id).daterangepicker(
                options,
            (start, end, label) => {
                this.$emit('start', start.format(this.valueFormat));
                this.$emit('end', end.format(this.valueFormat));
            }).on('cancel.daterangepicker', (ev, picker)=>{
                this.clear();
            }).on('apply.daterangepicker', (ev, picker)=>{
                this.$emit('start', picker.startDate.format(this.valueFormat));
                this.$emit('end', picker.endDate.format(this.valueFormat));
            });

            if (invalid) {this.rootPicker.val('')}

            this.picker = this.rootPicker.data('daterangepicker')
        },

        clear() {
            this.$emit('start', null);
            this.$emit('end', null);
            this.rootPicker.val('');
        },

        updateStart(aMoment) {
            if( aMoment.isValid()) {
                this.picker.setStartDate(aMoment)
            }
        },

        updateEnd(aMoment) {
            if (aMoment.isValid()) {
                this.picker.setEndDate(aMoment)
            }
        }
    },

    watch : {
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

<style type="text/css">
    @import url('~bootstrap-daterangepicker/daterangepicker.css');
</style>