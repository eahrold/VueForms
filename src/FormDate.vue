<template>
    <div class="form-group vf-form-group" :class='formClass'>
        <label class="control-label vf-control-label" :for='vf_uid'>{{ aLabel }}</label>
        <div class='input-group date'>
            <input
                v-bind='$attrs'
                v-on='$listeners'
                :id='vf_uid'
                :style='inputStyle'
                :class='inputClass'
                @blur='onBlur'
                @focus='onFocus'
                type='text'
                class="form-control vf-form-control" />
                 <a @click.prevent.stop='clear' class="input-group-addon input-group-prepend vf-input-group-addon">
                    <span class="input-group-text">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                 </a>
        </div>
        <form-errors
            v-if='displayErrors'
            v-bind="{errors, warning, property}">
        </form-errors>
        <p v-if="!!$slots['help']" class="help-block vf-help-block">
            <small><slot name='help'></slot></small>
        </p>
    </div>
</template>
<script>

import { props, errors, dates, vf_uid } from './mixins'
import _ from 'lodash'
import moment from 'moment'

var $ = require('jquery')
require('bootstrap-daterangepicker')

export default {
    mixins: [ props, errors, dates, vf_uid ],

    data () {
        return {
            picker: null
        }
    },

    mounted () {
        this.$nextTick(() => {
            this.load()
        })
    },

    methods: {
        $_emitDates (moment) {
            this.$emit('input', this.$_makeFormattedDate(moment))
        },

        load () {
            var options = {
                locale: {
                    cancelLabel: 'Clear',
                    format: this.pickerLocaleFormat
                },
                autoUpdateInput: this.autoApply,
                timePicker: this.timePicker,
                timePickerIncrement: this.timePickerIncrement
            }

            var invalid = false
            if (this.value) {
                const startDate = moment(this.value)
                if (startDate.isValid()) options.startDate = startDate
            } else invalid = true

            const config = _.assign({}, options, this.dateConfig)
            config.singleDatePicker = true

            this.rootPicker = $('#' + this.vf_uid).daterangepicker(config,
                (start, end, label) => {
                    this.$_emitDates(start)
                }).on('cancel.daterangepicker', (ev, picker) => {
                this.clear()
            }).on('apply.daterangepicker', (ev, picker) => {
                this.$_emitDates(picker.startDate)
            })

            if (invalid) { this.rootPicker.val('') }

            this.picker = this.rootPicker.data('daterangepicker')
        },

        clear () {
            this.$emit('input', null)
            this.rootPicker.val('')
        }
    },

    watch: {
        timePicker () {
            this.load()
            this.$_emitDates(moment(this.start))
        },

        value (change) {
            this.updateStart(moment(change))
        }
    }
}
</script>

<style lang='css' scoped>
    @import url('~bootstrap-daterangepicker/daterangepicker.css')
</style>
