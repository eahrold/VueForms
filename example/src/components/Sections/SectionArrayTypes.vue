<template>
  <form-section heading='Array Types'>
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

    <form-slider
      v-model='inline'
      property='inline'
      label='Show Checkbox and Radio Selects Inline'>
    </form-slider>

    <form-segmented-control
      v-model='model.segmented_control_info'
      :options='optionsArray'
      property='segmented_control_info'
      type='success'
      label='Segmented Control'>
    </form-segmented-control>

    <form-segmented-control
      v-model='model.segmented_control'
      :options='optionsArray'
      property='segmented_control'
      label='Segmented Control'>
    </form-segmented-control>

    <form-checkbox
      label='Show Checkbox and Radio Selects Inline'
      v-model='inline'
      property='inline'>
    </form-checkbox>

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
        inline: {}
    }
}
</script>

<style scoped lang="scss"></style>
