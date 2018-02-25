<template>
<div class="col-md-8 h-100 o-scroll">

  <SectionCore id='section-core' v-model='model' v-bind='{show, errors,}'/>
  <SectionArrayTypes id='section-array' v-model='model' v-bind='{errors, options, optionsArray, inline}' />
  <SectionAlert id='section-alert' v-model='model' v-bind='{errors, statuses, positions, messages}' />
  <SectionDateTime id='section-date-time' v-model='model' v-bind='{errors,}' />
  <SectionFile id='section-file' v-model='model' v-bind='{errors,}' />
  <SectionFeatures id='section-feature' v-model='model' v-bind='{errors,}' />
  <SectionAdvancedText id='section-advanced-text-editor' v-model='model' v-bind='{errors,}' />
</div>
</template>

<script type="text/javascript">

import _ from 'lodash'

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
    SectionAdvancedText
  },

  props: {
    value: {
      type: Object,
      required: false
    },

    show: {
      type: Object,
    },
  },

 data() {
    return {
      inline: false,
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

    statuses() {
      return {
        'success' : 'Success',
        'info' : 'Info',
        'warning' : 'Warning',
        'danger' : 'Danger',
      }
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
          'Really?'
        ]
    },

    errors() {
      if (!this.show.showFakeErrors) return null
      return {
          text: ['that text is too long'],
          text_required: ['text is required here'],
          email: ['you need a better email address'],
      }
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
