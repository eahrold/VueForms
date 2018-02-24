<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='vf_uid'>{{ aLabel }}</label>
        <div class='input-group date'>
            <input
                @blur='onBlur'
                @focus='onFocus'
                :id='vf_uid'
                type='text'
                class="form-control" />
            <span class="input-group-addon">
                <span @click='clear' class="glyphicon glyphicon-remove-circle"></span>
            </span>
        </div>
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

var $ = require('jquery');
var moment = require('moment');
require('bootstrap-daterangepicker')

import { props, errors, dates, vf_uid } from './mixins';

export default {
    mixins: [ props, errors, dates, vf_uid ],

    data () {
        return {
            picker: null
        }
    },

    mounted () {
        this.$nextTick(()=>{
            this.load();
        });
    },

    methods : {
        $_emitDates(moment) {
            this.$emit('input', this.$_makeFormattedDate(moment));
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
            if(this.value) {
                const startDate = moment(this.value);
                if (startDate.isValid()) options.startDate = startDate
            } else invalid = true

            const config = _.assign({}, options, this.dateConfig)
            config.singleDatePicker = true

            this.rootPicker = $('#'+this.vf_uid).daterangepicker(config,
            (start, end, label) => {
                this.$_emitDates(start);
            }).on('cancel.daterangepicker', (ev, picker)=>{
                this.clear();
            }).on('apply.daterangepicker', (ev, picker)=>{
                this.$_emitDates(picker.startDate);
            });

            if (invalid) {this.rootPicker.val('')}

            this.picker = this.rootPicker.data('daterangepicker')
        },

        clear() {
            this.$emit('input', null);
            this.rootPicker.val('');
        },

        updateStart(aMoment) {
            if( aMoment.isValid()) {
                this.picker.setStartDate(aMoment)
            }
        },
    },

    watch : {
       value (change) {
            this.updateStart(moment(change))
        },
    }
}
</script>

<style lang='css' scoped>
    @import url('~bootstrap-daterangepicker/daterangepicker.css')
</style>