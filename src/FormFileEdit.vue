<template>
    <div class="col-md-12 row">
        <div class="col-md-4">
            <img
                :style="thumbStyle"
                :src="src"
                class="img-thumbnail selected">
        </div>
        <div class="col-md-8">
            <slot name="before"/>
            <form-text
                v-model="src"
                :disabled="true"
                property="src"/>
            <form-text
                v-model="aValue.alt"
                property="alt" />
            <form-number
                :min="0"
                :value="aValue.width"
                placeholder="auto"
                property="width"
                @input="updateWidth" />
            <form-number
                :min="0"
                :value="aValue.height"
                placeholder="auto"
                property="height"
                @input="updateHeight" />
            <form-checkbox
                v-model="aValue.constrain"
                property="constrain" />
            <form-select
                v-model="aValue.align"
                :options="alignment"
                property="align" />

            <div class="form-group vf-form-group">
                <label class="control-label vf-control-label">Alginment</label>
                <div class="btn-group">
                    <button
                        v-for="(align, idx) in alignment"
                        :key="idx"
                        :class="{active: (aValue.align == align.value)}"
                        class="btn btn-default"
                        @click="selectAlignment(align.value)">
                        <i
                            :class="`vf-icon-image-${align.value}`"
                            class="vf-icon"/>
                    </button>
                </div>
            </div>

            <form-textarea
                :rows="2"
                v-model="aValue.caption"
                property="caption" />
            <slot name="after"/>
        </div>
    </div>
</template>

<script>

import { core } from './mixins'

export default {
    mixins: [ core ],

    props: {
        src: {
            type: String,
            required: true
        }
    },

    computed: {
        thumbStyle () {
            return {
                width: '200px',
                height: `${200 * (this.aValue.height / this.aValue.width)}px`}
        },

        alignment () {
            return [
                {value: 'left', text: 'Left Aligned'},
                {value: 'center', text: 'Center Aligned'},
                {value: 'right', text: 'Right Aligned'}
            ]
        }
    },

    methods: {
        selectAlignment (align) {
            if (this.aValue.align === align) align = 'default'
            this.$set(this.aValue, 'align', align)
        },

        updateWidth (newVal) {
            if (this.aValue.constrain && newVal > 0) {
                this.aValue.height = Math.round(this.aValue.height * (newVal / this.aValue.width))
            }
            this.aValue.width = Math.round(newVal)
        },

        updateHeight (newVal) {
            if (this.aValue.constrain && newVal > 0) {
                this.aValue.width = Math.round(this.aValue.width * (newVal / this.aValue.height))
            }
            this.aValue.height = Math.round(newVal)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('./styles/icons.scss')
</style>
