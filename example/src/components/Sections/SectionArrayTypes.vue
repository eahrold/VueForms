<template>
  <form-section heading='Array Types'>
    <form-slider
      v-model='inline'
      property='inline'
      label='Show Checkbox and Radio Selects Inline'>
    </form-slider>

    <form-select-many
      label='Select Many'
      class='col-md-6'
      v-model='model.checkbox_group'
      :multiple='true'
      property='checkbox_group'
      v-bind='{options: options, errors}'>
    </form-select-many>

    <form-checkbox-group
      v-model='model.checkbox_group'
      property='checkbox_group'
      :inline='inline'
      :options='options'
      :errors='errors'>
          <template slot='help'><b>Current Val: {{ model.checkbox_group | pick('value') }}</b> </template>
    </form-checkbox-group>


    <form-checkbox-group
      v-model='model.checkbox_group_from_array'
      property='checkbox_group_from_array'
      :inline='inline'
      :options='optionsArray'
      :errors='errors'>
          <template slot='help'><b>Current Val: {{ model.checkbox_group_from_array }}</b> </template>
    </form-checkbox-group>

    <form-segmented-control
      v-model='model.segmented_control_info'
      property='segmented_control_info'
      :options='optionsArray'
      :type='status'
      label='Segmented Control'>
    </form-segmented-control>

    <form-select-many
      label='Select One'
      class='col-md-6'
      v-model='model.radio_select'
      property='radio_select'
      v-bind='{options, errors}'>
    </form-select-many>

    <form-radio-button
      v-model='model.radio_select'
      property='radio_select'
      v-bind='{inline, options, errors, inline}'
      text-key='text'>
        <template slot='help'><b>Current Val: {{ model.radio_select }}</b> </template>
    </form-radio-button>

    <form-selectize
      v-model='model.selectize_multiple'
      property='selectize_multiple'
      :multiple='true'
      :inline='inline'
      :options='options'
      :errors='errors'>
          <template slot='help'>
            <b>Current Val: {{ model.selectize_multiple }}</b>
          </template>
    </form-selectize>

    <form-options-list
      v-model='model.options_list'
      property='options_list'
      :options='options'
      value-key='value'
      text-key='text'
      :errors='errors'>
    </form-options-list>
  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
    filters: {
      pick(value, key) {
        return _.map(value, function(object) {
          return `{..., "${key}": "${object[key]}"}`;
        }).join(', ');
      }
    },

    mixins: [ section ],
    props: {
        options: {},
        optionsArray: {},
        status: {},
    },

    data() {
      return {
        inline: false,
      }
    },

    computed: {
      longOptions() {
        return Array.apply(null, {length: 50}).map(function(value, index){
          const count = index+1
          return {text: `Option ${count}`, value: count}
        });
      }
    }
}
</script>

<style scoped lang="scss"></style>
