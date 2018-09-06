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
    <div
        :class="formClass"
        class="form-group vf-form-group">
        <label
            :for="vf_uid"
            class="control-label vf-control-label">{{ label }}: </label>
        <div class="input-group vf-input-group">
            <input
                v-bind="$attrs"
                :id="vf_uid"
                :name="label"
                :style="inputStyle"
                :class="inputClass"
                type="text"
                class="form-control vf-form-control"
                v-on="$listeners"
                @blur="onBlur"
                @focus="onFocus">
            <a
                class="input-group-addon input-group-prepend vf-input-group-addon vf-date-addon"
                @click.prevent.stop="clear">
                <span class="input-group-text">
                    <i
                        class="fa fa-times-circle"
                        aria-hidden="true"/>
                </span>
            </a>
        </div>
        <form-errors
            v-for="(property, idx) in properties"
            :key="idx"
            :errors="errors"
            :property="property"/>
        <p
            v-if="!!$slots['help']"
            class="help-block vf-help-block"><small><slot name="help"/></small></p>
    </div>
</template>
<script>

import { errors, dates, styles, vf_uid } from './mixins'
import _ from 'lodash'
import moment from 'moment'

var $ = require('jquery')
require('bootstrap-daterangepicker')

export default {
    mixins: [ errors, dates, styles, vf_uid ],

    props: {
        properties: {
            type: Array,
            default: () => { return [] }
        },

        label: {
            type: String
        },

        start: {
            type: String
        },

        end: {
            type: String
        },

        errors: {
            type: Object,
            required: false
        },

        rules: {
            type: [Array, Function, Boolean],
            default: true
        }
    },

    data () {
        return {
            picker: null,
            rootPicker: null,
            range: null
        }
    },

    computed: {
        ranges () {
            return {
                'Today': [
                    moment().toDate(),
                    moment().toDate()
                ],
                'Yesterday': [
                    moment().subtract(1, 'days').toDate(),
                    moment().subtract(1, 'days').toDate()
                ],
                'Past week': [
                    moment().subtract(1, 'week').toDate(),
                    moment().toDate()
                ],
                'Past Month': [
                    moment().subtract(1, 'months').toDate(),
                    moment().toDate()
                ],
                'Past Year': [
                    moment().subtract(1, 'years').toDate(),
                    moment().toDate()
                ]
            }
        },

        isValid () {
            if (!this.required) return true
            return (!!this.start && moment(this.start).isValid()) && (!!this.end && moment(this.end).isValid())
        }
    },

    watch: {
        timePicker (change) {
            this.load()
            this.$_emitDates(moment(this.start), moment(this.end))
        },

        start (change) {
            this.updateStart(moment(change))
            if (change === null) {
                this.rootPicker.val('')
            }
        },

        end (change) {
            this.updateEnd(moment(change))
            if (change === null) {
                this.rootPicker.val('')
            }
        }
    },

    mounted () {
        this.$nextTick(() => {
            this.load()
        })
    },

    methods: {
        $_emitDates (start, end) {
            this.$emit('update:start', this.$_makeFormattedDate(start))
            this.$emit('update:end', this.$_makeFormattedDate(end))
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

            if (this.showRanges) {
                options.ranges = this.ranges
            }

            var invalid = false
            if (this.start) {
                const startDate = moment(this.start)
                if (startDate.isValid()) options.startDate = startDate
            } else invalid = true

            if (this.end) {
                const endDate = moment(this.end)
                if (endDate.isValid()) options.endDate = endDate
            } else invalid = true

            const config = _.assign({}, options, this.dateConfig)

            this.rootPicker = $('#' + this.vf_uid).daterangepicker(
                config,
                (start, end, label) => {
                    this.$_emitDates(start, end)
                }).on('cancel.daterangepicker', (ev, picker) => {
                this.clear()
            }).on('apply.daterangepicker', (ev, picker) => {
                this.$_emitDates(picker.startDate, picker.endDate)
            }).on('hide.daterangepicker', (ev, picker) => {
                this.$_emitDates(picker.startDate, picker.endDate)
            })

            if (invalid) { this.rootPicker.val('') }

            this.picker = this.rootPicker.data('daterangepicker')
        },

        clear () {
            this.$_emitDates(null, null)
            this.rootPicker.val('')
        }
    }
}
</script>

<style lang='css'>
    @import url('~bootstrap-daterangepicker/daterangepicker.css')
</style>
