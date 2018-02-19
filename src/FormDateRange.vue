<template>
<!--
Date Range Picker Component

Usage:
<form-daterange
   :start='start_prop'
   @start='start_prop = arguments[0]'
   :end='end_prop'
   @end='end_prop = arguments[0]'
   :properties="['start_prop', 'end_prop']"
   label='Some Label'>
</form-daterange>
 -->
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ label }}: </label>
        <div class="input-group">
            <input
                @blur='onBlur'
                @focus='onFocus'
                class='form-control'
                :id='vf_uid'
                type="text"
                :name="label"/>
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

import { errors, dates, vf_uid } from './mixins';

export default {
    mixins: [ errors, dates, vf_uid ],

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
            this.$emit('start', this.$_makeFormattedDate(start));
            this.$emit('end', this.$_makeFormattedDate(end));
        },

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