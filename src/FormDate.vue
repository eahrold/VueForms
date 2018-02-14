<template>
    <div class="form-group" :class='formClass'>
        <label class="control-label" :for='label'>{{ aLabel }}</label>
        <div class='input-group date'>
            <input :id='id' type='text' class="form-control" />
            <span class="input-group-addon">
                <span @click='clear' class="glyphicon glyphicon-remove-circle"></span>
            </span>
        </div>
        <form-errors :errors='errors' :property='property'></form-errors>
    </div>
</template>
<script>

var $ = window.$ || require('jquery');
var moment = require('moment');
require('eonasdan-bootstrap-datetimepicker');

import { props, errors, dates } from './FormElementMixins';

const DEFAULT_FORMAT = "YYYY-MM-DD";

export default {
    mixins: [ props, errors, dates ],

    props: {
        stepping: {
            type: Number,
            default: 15
        },

        viewMode: {
            type: String,
            default: "days"
        },

        defaultDate: {
            type: Object,
            default: ()=>{ return moment() }
        },

        format: {
            type: String,
            default: DEFAULT_FORMAT
        },

        timePicker: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            single: true,
            id: 'daterange-' + Math.floor(Math.random() * 9999),
            picker: null
        }
    },

    mounted () {
        this.$nextTick(()=>{
            this.load();
        });
    },

    computed: {
        $_FormDate_format() {
            if (this.format === DEFAULT_FORMAT && this.timePicker) {
                return `${this.format} hh:mm a`
            }
            return this.format;
        }
    },

    methods : {
        clear() {
            $('#'+this.id).datetimepicker().data("DateTimePicker").date(null)
        },

        update(date) {
            $('#'+this.id).datetimepicker().data("DateTimePicker").date(moment(date) || null);
        },

        load () {

            $('#'+this.id).datetimepicker({
                format: this.$_FormDate_format,
                stepping: this.stepping,
                showTodayButton: true,
                viewMode: this.viewMode,
                defaultDate: this.defaultDate
            }).on('dp.change', (e)=>{
                this.$emit('input', e.date ? e.date.format() : null);
            }).data("DateTimePicker").date(moment(this.value) || null);
        }
    },

    watch : {
        value (newVal, oldVal) {
            this.update(newVal)
        },
    }
}
</script>

<style type="text/css">
    @import url('~eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
</style>