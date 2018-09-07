<template>
<div class="col-md-8 h-100 o-scroll">
  <h1>Vue Forms</h1>
  <SectionFeatures id='section-feature' v-model='model' v-bind='{errors,}' />
  <SectionArrayTypes id='section-array' v-model='model' v-bind='{errors, status, options, optionsArray, optionsComplex}' />
  <SectionAdvancedText id='section-advanced-text-editor' v-model='model' v-bind='{errors,}' />
  <SectionCore id='section-core' v-model='model' v-bind='{validation, show, errors,}'/>
  <SectionAlert id='section-alert' v-model='model' v-bind='{fakeErrors, status, statuses, positions, messages}' />
  <SectionDateTime id='section-date-time' v-model='model' v-bind='{errors,}' />
  <SectionFile id='section-file' v-model='model' v-bind='{errors,}' />
</div>
</template>

<script type="text/javascript">

import _ from 'lodash'

import VueSelect from './VueSelect.vue'

import {
  SectionCore,
  SectionArrayTypes,
  SectionAlert,
  SectionDateTime,
  SectionFeatures,
  SectionFile,
  SectionAdvancedText
} from './Sections'

export default {
  components : {
    SectionCore,
    SectionArrayTypes,
    SectionAlert,
    SectionDateTime,
    SectionFeatures,
    SectionFile,
    SectionAdvancedText,
    VueSelect,
  },

  props: {
    value: {
      type: Object,
      required: false
    },

    show: {
      type: Object,
    },

    statuses: {},
    status: {},
    fakeErrors: {},
    validation: {},
  },

 data() {
    return {
      showModal: false,

      options: [
        {value: "opt1", text: 'Option 1'},
        {value: "opt2", text: 'Option 2'},
        {value: "opt3", text: 'Option 3'}
      ],

      optionsArray: [
        'Option 1',
        'Option 2',
        'Option 3',
      ],

      optionsComplex: [
        {id: 1001, name: "james", email: 'Option 4'},
        {id: 1002, name: "antremple", email: 'Option 3'},
        {id: 1003, name: "thramplor", email: 'Option 6'},
      ],

      model: this.value
    }
  },

  mounted() {
    this.model = this.value
  },

  computed: {
    console() {
      return window.console
    },

    positions() {
      return {
        'top' : 'Top',
        'bottom' : 'Bottom',
      }
    },

    messages() {
        return [
          'Oops... something went wrong.',
          'Please call back later.',
          'Are you sure you wanted to do that?',
          'Who are you?',
          'Really?',
          this.lipsum
        ]
    },

    lipsum() {
      return `
<b>Here's some text</b> It automatically truncates after 1000 characters.
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue aliquet facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur sit amet tortor vitae orci elementum bibendum sit amet eget neque. Nullam vestibulum quam cursus urna feugiat blandit. In ac molestie lacus. Etiam tristique libero placerat eros vulputate, non consectetur lorem pulvinar. Suspendisse finibus ex molestie arcu commodo tempor. Fusce elementum leo ac purus finibus mollis. Vivamus tincidunt pellentesque augue quis bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed laoreet sem odio, non rhoncus eros convallis nec. Sed in lacinia tortor. Ut a imperdiet nisi, tincidunt pretium dui. Etiam ornare at velit ut dignissim.
</p>
<p>
Suspendisse eget commodo ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ut placerat felis. Quisque id metus nisi. Sed et feugiat sem, sed pharetra urna. Curabitur dignissim euismod risus, ac vestibulum ante. Nunc turpis felis, hendrerit quis urna a, porta elementum mi. Nullam libero dui, blandit nec tortor a, cursus tempor nibh. Sed hendrerit nibh nec nisi tempor pellentesque. Praesent tincidunt mollis est id fermentum.
</p>
`
    },

    errors() {
      if (!this.show.showFakeErrors) return null
      return this.fakeErrors
    }
  },

  watch: {
    model(newVal) {
      this.$emit('input', newVal)
    },

    value(newVal) {
      this.model = newVal
    }
  },
}
</script>

<style scoped lang="scss"></style>
