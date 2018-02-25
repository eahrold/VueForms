<template>
  <form-section heading='Date and Time'>
  <form-date
    v-model='model.date'
    property='date'
    :errors='errors'>
      <template slot='help'><b>Current Val: {{ model.date }}</b> </template>
  </form-date>

  <form-date
    v-model='model.date_time'
    property='date_time'
    :time-picker='true'
    :errors='errors'>
      <template slot='help'><b>Current Val: {{ model.date_time }}</b> </template>
  </form-date>`

  <form-daterange
    :start.sync='model.start'
    :end.sync='model.end'
    :properties="['start', 'end']"
    label="Date Range"
    :errors='errors'
    >
      <template slot='help'><b>Current Val: {{ model.start }} - {{ model.end }}</b> </template>
    </form-daterange>

  <form-daterange
    :start.sync='model.start_time'
    :end.sync='model.end_time'
    :properties="['start_time', 'end_time']"
    label="Date Range With Time"
    :time-picker="true"
    :errors='errors'
    >
      <template slot='help'><b>Current Val: {{ model.start_time }} - {{ model.end_time }}</b> </template>
    </form-daterange>

  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
    mixins: [ section ],
    props: {}
}
</script>

<style scoped lang="scss"></style>
