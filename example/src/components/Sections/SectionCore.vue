<template>
  <form-section heading='Core Types'>
  <template v-if='show.showElementsAll'>
    <form-text
      v-model='model.text'
      property='text'
      :errors='errors'
      placeholder='First Name (Placeholder Example)'>
        <template slot='help'><b>[Current Val: {{ `${model.text}` }}]</b> </template>
    </form-text>

    <form-text
      v-model='model.text_required'
      :required='true'
      property='text_required'
      :errors='errors'>
        <template slot='help'>
          <b>[Current Val: {{ `${model.text_required}` }}]</b>
          Validator Status <code>{{ `${$validation.getStatus('text_required')}` }}</code>
        </template>
    </form-text>


    <form-text
      v-model='model.text_prepopulated'
      property='text_prepopulated'
      :errors='errors'
      placeholder='Now Empty (Placeholder Example)'>
        <template slot='help'><b>[Current Val: {{ `${model.text_prepopulated}` }}]</b> </template>
    </form-text>
  </template>

  <form-text
    v-model='model.email'
    property='email'
    :errors='errors'
    :rules='[$validation.rules.email]'>
      <template slot='help'>
        <b>[Current Val: {{ `${model.email}` }}]</b>
        Validator Status <code>{{ `${$validation.getStatus('email')}` }}</code> This uses <code>:rules='[$validation.rules.email]'</code>
      </template>
  </form-text>

  <form-text
    v-model='model.url'
    property='url'
    :errors='errors'
    :rules='[$validation.rules.url]'>
      <template slot='help'>
        <b>[Current Val: {{ `${model.url}` }}]</b>
        Validator Status <code>{{ `${$validation.getStatus('url')}` }}</code> This uses <code>:rules='[$validation.rules.url]'</code>
      </template>
  </form-text>

  <form-number
    v-model='model.form_number'
    property='form_number'
    :errors='errors'
    :rules='[$validation.rules.number]'>
      <template slot='help'>
        <b>[Current Val: {{ `${model.form_number}` }}]</b>
        Validator Status <code>{{ `${$validation.getStatus('form_number')}` }}</code> This uses <code>:rules='[$validation.rules.number]'</code>
      </template>
  </form-number>

  <form-password
    v-model='model.password'
    property='password'
    :confirm='model.password_confirm'
    :required='true'
    :rules='[$validation.rules.match(model.password_confirm, "password confirm")]'
    :errors='errors'>
        <template slot='help'>
          <b>[Current Val: {{ `${model.password}` }}]</b>
          Validator Status <code>{{ `${$validation.getStatus('password')}` }}</code> This uses <code>:rules='[$validation.rules.match(model.password_confirm)]'</code>
        </template>
  </form-password>

  <form-password
    v-model='model.password_confirm'
    property='password_confirm'
    :errors='errors'>
      <template v-if='(model.password_confirm !== null) && (model.password !== model.password_confirm)' slot='help'>Password and Confirm must match</template>
  </form-password>

    <form-textarea
      v-model='model.text_area'
      property='text_area'
      :errors='errors'>
    </form-textarea>
  </form-section>
</template>

<script type="text/javascript">

import _ from 'lodash'
import { section } from './mixins'

export default {
    mixins: [ section ],
    props: {
        validation:{},
        show: {
            type: Object,
        },
    }
}
</script>

<style scoped lang="scss"></style>
