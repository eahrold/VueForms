<template>
<!--
Borrowed Heavily from
https://github.com/fareez-ahamed/autocomplete-vuejs2
-->
<div class="form-group vf-form-group" :class='formClass'>
    <div style="position:relative" :class="{'open':openSuggestion}">
        <label :for='vf_uid'>{{ aLabel }}: </label>
        <input
            v-bind='$attrs'
            v-on='$listeners'
            type="text"
            :id="vf_uid"
            :name='property'
            :value="aValue"
            :style='inputStyle'
            :class='inputClass'
            @input="updateValue($event.target.value)"
            @keydown.enter = 'enter'
            @keydown.down = 'down'
            @keydown.up = 'up'
            class="form-control vf-form-control">
        <ul class="dropdown-menu" style="width:100%">
            <li v-for="(suggestion, idx) in matches"
                :class="{'active': isActive(idx)}"
                @click="suggestionClick(idx)">
                <span class="clickable">{{ suggestion }}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>

import { core } from './mixins';

export default {
    mixins: [ core ],

    props: {
        suggestions: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            open: false,
            current: 0,
            aValue: null,
        }
    },

    mounted() {
        this.$nextTick(()=>{
            this.aValue = this.value
        })
    },

    computed: {
        // Filtering the suggestion based on the input
        matches () {
            return this.suggestions.filter((item) => {
            return item.includes(this.aValue)
        })
    },

    openSuggestion () {
        return this.selection !== '' &&
               this.matches.length !== 0 &&
               this.open === true
        }
    },
    methods: {
        updateValue (value) {
            if (this.open === false) {
                this.open = true
                this.current = 0
            }
            this.aValue = value
        },
        // When enter pressed on the input
        enter () {
            this.aValue = this.matches[this.current];
            this.open = false
        },

        // When up pressed while suggestions are open
        up () {
            if (this.current > 0) {
                this.current--
            }
        },

        // When up pressed while suggestions are open
        down () {
            if (this.current < this.matches.length - 1) {
                this.current++
            }
        },

        // For highlighting element
        isActive (index) {
            return index === this.current
        },

        // When one of the suggestion is clicked
        suggestionClick (index) {
            this.aValue = this.matches[index];
            this.open = false
        }
    }
}
</script>


<style scoped>
.dropdown-menu {
    overflow-y: scroll;
    max-height: 10em;
}
</style>