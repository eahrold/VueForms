<template>
  <form-section heading='Array Types'>
    <form-slider
      v-model='inline'
      property='inline'
      label='Show Checkbox and Radio Selects Inline'>
    </form-slider>

    <form-checkbox-group
      v-model='model.checkbox_group'
      property='checkbox_group'
      :inline='inline'
      :options='options'
      :errors='errors'>
          <template slot='help'><b>Current Val: {{ model.checkbox_group }}</b> </template>
    </form-checkbox-group>

    <form-checkbox-group
      v-model='model.checkbox_group_from_array'
      property='checkbox_group_from_array'
      :inline='inline'
      :options='optionsArray'
      :errors='errors'>
          <template slot='help'><b>Current Val: {{ model.checkbox_group_from_array }}</b> </template>
    </form-checkbox-group>

    <form-radio-button
      v-model='model.radio_select'
      property='radio_select'
      :inline='inline'
      :options='options'
      :errors='errors' >
        <template slot='help'><b>Current Val: {{ model.radio_select }}</b> </template>
    </form-radio-button>

    <form-segmented-control
      v-model='model.segmented_control_info'
      :options='optionsArray'
      property='segmented_control_info'
      :type='status'
      label='Segmented Control'>
    </form-segmented-control>

    <form-select-many v-model='model.options_item' property='options_item' v-bind='{options, errors}'></form-select-many>
    <form-select-many v-model='model.options_list' :multiple='true' property='options_list' v-bind='{options, errors}'></form-select-many>

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
      key-by='text'
      :errors='errors'>
    </form-options-list>
  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
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
    }
}
</script>

<style scoped lang="scss"></style>
