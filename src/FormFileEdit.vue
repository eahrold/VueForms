<template>
<div class="col-md-12">
    <div class="col-md-4">
        <img class='img-thumbnail selected' :style='thumbStyle' :src="src">
    </div>
    <div class="col-md-8">
        <slot name='before'></slot>
        <form-text v-model='src' property='src' :disabled='true'/>
        <form-text v-model='aValue.alt' property='alt' />
        <form-number :min='0' :value='aValue.width' @input='updateWidth' placeholder='auto' property='width' />
        <form-number :min='0' :value='aValue.height' @input='updateHeight' placeholder='auto' property='height' />
        <form-checkbox v-model='aValue.constrain' property='constrain' />
        <form-textarea :rows='2' v-model='aValue.caption' property='caption' />
        <slot name='after'></slot>
    </div>
</div>
</template>

<script>

import { core } from './mixins';

export default {
    mixins: [ core ],

    props : {
        src: {
            type: String,
            default: true
        }
    },

    computed: {
        thumbStyle() {
            return {
                width: "200px",
                height:`${200 * (this.aValue.height/this.aValue.width)}px`}
        }
    },

    methods: {
        updateWidth(newVal) {
            if(this.aValue.constrain && newVal > 0) {
                this.aValue.height = Math.round(this.aValue.height * (newVal/this.aValue.width))
            }
            this.aValue.width = Math.round(newVal)
        },

        updateHeight(newVal) {
            if(this.aValue.constrain && newVal > 0) {
                this.aValue.width =  Math.round(this.aValue.width * (newVal/this.aValue.height))
            }
            this.aValue.height = Math.round(newVal)
        }
    }
}
</script>