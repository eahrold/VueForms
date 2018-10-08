<template>
  <form-section heading='Array Types'>
    <form-slider
      v-model='inline'
      property='inline'
      label='Show Checkbox and Radio Selects Inline'>
    </form-slider>

    <form-select-many
      label='Select Many'
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
          <template slot='help'><b>Current Val: {{ model.checkbox_group }}</b> </template>
    </form-checkbox-group>

    <form-select-many
      label='Select Many Complex Array (Slotted Scoped)'
      v-model='model.select_many_scoped'
      :multiple='true'
      :value-map='$vfselect.valueMap.raw'
      :is-selected='$vfselect.isSelected.byId'
      property='select_many_scoped'
      :options='optionsComplex'
      :errors='errors'>
      <span slot='selected' slot-scope='context'>You've Chosen <b>{{ context.value.length }}</b> items <em>({{
        context.value.map(function(i){ return i.email}).slice(0, 2).join(', ')
      }}...)</em></span>
      <span slot='option-label' slot-scope='context'>
        <b>{{ context.option.name }}</b><em> {{ context.option.email }}</em>
      </span>
    </form-select-many>

    <pre class="bg-code"><code>{{ JSON.stringify(model.select_many_scoped, null, 2) }}</code></pre>

    <form-select-many
      label='Select Many Complex Array'
      v-model='model.selectize_multiple'
      :multiple='true'
      :value-key='false'
      text-key='name'
      :is-selected='$vfselect.isSelected.byId'
      property='selectize_multiple'
      :options='optionsComplex'
      :errors='errors'>
    </form-select-many>


    <form-select-many
      label='Select Many From Array'
      v-model='model.checkbox_group_from_array'
      :multiple='true'
      property='checkbox_group_from_array'
      :options='optionsArray'
      :errors='errors'>
    </form-select-many>

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
        optionsComplex: {},
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

<style scoped lang="scss">
.bg-code {
  border-radius: 1em;
  background: #fff3f5;
  padding: 1em
}
</style>
