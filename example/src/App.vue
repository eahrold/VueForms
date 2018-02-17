<template>
  <div id="app" class="container">
    <div class="row">
        <div class="col-md-8">

          <form-checkbox label='Show All Elements' v-model='showElementsAll' property='showElementsAll'></form-checkbox>
          <form-checkbox label='Fake Errors' v-model='showFakeErrors' property='showFakeErrors'></form-checkbox>

          <template v-if='showElementsAll'>
          <form-text v-model='model.text' property='text' :errors='errors' placeholder='First Name (Placeholder Example)'>
              <template slot='help'><b>[Current Val: {{ `${model.text}` }}]</b> </template>
          </form-text>

          <form-text v-model='model.text_required' :required='true' property='text_required' :errors='errors'>
              <template slot='help'>Validator Status <code>{{ `${$validation.registry.text_required}` }}</code> <b>[Current Val: {{ `${model.text_required}` }}]</b> </template>
          </form-text>

          <form-text v-model='model.text_prepopulated' property='text_prepopulated' :errors='errors' placeholder='Now Empty (Placeholder Example)'>
              <template slot='help'><b>[Current Val: {{ `${model.text_prepopulated}` }}]</b> </template>
          </form-text>
          </template>

          <form-text v-model='model.email' property='email' :errors='errors' :rules='[$validation.rules.email]'>
              <template slot='help'>Validator Status <code>{{ `${$validation.registry.email}` }}</code> This uses <code>:rules='[$validation.rules.email]'</code> <b>[Current Val: {{ `${model.email}` }}]</b> </template>
          </form-text>

          <form-text v-model='model.url' property='url' :errors='errors' :rules='[$validation.rules.url]'>
              <template slot='help'>Validator Status <code>{{ `${$validation.registry.url}` }}</code> This uses <code>:rules='[$validation.rules.url]'</code> <b>[Current Val: {{ `${model.url}` }}]</b> </template>
          </form-text>

          <form-number v-model='model.form_number' property='form_number' :errors='errors'>
              <template slot='help'><b>[Current Val: {{ `${model.form_number}` }}]</b> </template>
          </form-number>

          <form-password v-model='model.password' property='password' :confirm='model.password_confirm' :rules='[(val)=>{ return !!val && (val === model.password_confirm)}]':errors='errors'>
                <template slot='help'>Validator Status <code>{{ `${$validation.registry.password}` }}</code> This uses <code>:rules='[(val)=>{ return doSomething...})]'</code> <b>[Current Val: {{ `${model.password}` }}]</b> </template>
          </form-password>

          <form-password v-model='model.password_confirm' property='password_confirm' :errors='errors'>
              <template v-if='(model.password_confirm !== null) && (model.password !== model.password_confirm)' slot='help'>Password and Confirm must match</template>
          </form-password>

          <form-textarea v-model='model.text_area' property='text_area' :errors='errors'>
          </form-textarea>

          <form-slider label='Show Checkbox and Radio Selects Inline' v-model='inline' property='inline'></form-slider>
          <form-checkbox label='Show Checkbox and Radio Selects Inline' v-model='inline' property='inline'></form-checkbox>

          <form-selectize :multiple='true' :inline='inline' v-model='model.selectize_multiple' :options='options' property='checkbox_group' :errors='errors'>
                <template slot='help'><b>Current Val: {{ model.selectize_multiple }}</b> </template>
          </form-selectize>

          <form-checkbox-group :inline='inline' v-model='model.checkbox_group' :options='options' property='checkbox_group' :errors='errors'>
                <template slot='help'><b>Current Val: {{ model.checkbox_group }}</b> </template>
          </form-checkbox-group>

          <form-checkbox-group :inline='inline' v-model='model.checkbox_group_from_array' :options='optionsArray' property='checkbox_group_from_array' :errors='errors'>
                <template slot='help'><b>Current Val: {{ model.checkbox_group_from_array }}</b> </template>
          </form-checkbox-group>

          <form-radio-button :inline='inline' v-model='model.radio_select' :options='options' property='radio_select' :errors='errors' >
              <template slot='help'><b>Current Val: {{ model.radio_select }}</b> </template>
          </form-radio-button>


          <form-date v-model='model.date' property='date' :errors='errors'>
              <template slot='help'><b>Current Val: {{ model.date }}</b> </template>
          </form-date>

          <form-date v-model='model.date_time' :time-picker='true' property='date_time' :errors='errors'>
              <template slot='help'><b>Current Val: {{ model.date_time }}</b> </template>
          </form-date>`

          <form-options-list
              v-model='model.options_list'
              :options='options'
              key-by='text'
              property='options_list'
              :errors='errors'>
          </form-options-list>

          <form-daterange
            :start='model.start'
            :end='model.end'
            @start='model.start = arguments[0]'
            @end='model.end = arguments[0]'
            :properties="['start', 'end']"
            label="Date Range"
            >
              <template slot='help'><b>Current Val: {{ model.start }} - {{ model.end }}</b> </template>
            </form-daterange>

          <form-daterange
            :start='model.start_time'
            :end='model.end_time'
            @start='model.start_time = arguments[0]'
            @end='model.end_time = arguments[0]'
            :properties="['start_time', 'end_time']"
            label="Date Range With Time"
            :time-picker="true"
            >
                <template slot='help'><b>Current Val: {{ model.start_time }} - {{ model.end_time }}</b> </template>
            </form-daterange>

          <form-address v-model='model.address' property='address' :include-coordinates='true' :errors='errors'>
              <template slot='help'>use the `include-coordinated` prop to conditionally display Lat &amp; Lng</template>
          </form-address>

          <form-dropzone v-model='model.dropzone'
              label='File'
              property='images'
              type='SOME_MODEL_TYPE'
              :file-types='$vfconfig.fileTypes.any'
              :id='model.id'
              :errors='errors'>
          </form-dropzone>

          <form-panel>
             <button class="btn btn-default" @click='showModal = true'>Launch An Example Modal</button>
          </form-panel>

          <form-modal @close='showModal = false' v-if='showModal'>
              <template slot='header'>Reset Your Password</template>
              <template slot='body'>
                  <form-text v-model='model.email' property='email' :errors='errors'></form-text>

                  <div class="row">
                    <form-password class='col-md-6' v-model='model.password' property='password' :errors='errors' />
                    <form-password class='col-md-6' v-model='model.password_confirm' property='password_confirm' :errors='errors' />
                  </div>
              </template>
          </form-modal>

          <form-seo label='SEO DATA' v-model='model.seo' property='seo'></form-seo>
          <form-tinymce label='Tinymce' v-model='model.tinymce' property='tinymce'></form-tinymce>

          <form-markdown label='Markdown' v-model='model.markdown' property='markdown'></form-markdown>

        </div>


        <div class="col-md-4">
            <h4>Validation</h4>
            <form-panel>
              <p>Validation Passes: <code>{{ $validation.passes }}</code> </p>
              <p>Validation Fails: <code>{{ $validation.fails }}</code> </p>
              <h4>Faling Props</h4>
              <p v-for='(value, key) in $validation.failing'><code>{{key}}</code></p>

              <button class='btn btn-default' :disabled='$validation.fails'>You Can Click Me When Valid</button>
            </form-panel>

            <h4>Properties</h4>
            <form-panel>
              <p v-for='(value, key) in model'><b>{{key}}: </b>{{ value }}</p>
            </form-panel>
        </div>
    </div>
  </div>
</template>

<script>

import { ValidationSyncMixin } from 'vue-forms'

export default {
  name: 'App',

  mixins: [
    ValidationSyncMixin,
  ],

  data() {
    return {
      inline: false,
      showModal: false,
      showElementsAll: true,
      showFakeErrors: false,

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

      model: {
        id: 12345,
        text: null,
        text_required: null,
        text_prepopulated: "Here to start",
        email: null,
        url: null,

        text_mask: null,
        number: null,
        password: null,
        password_confirm: null,

        text_area: null,

        selectize: null,
        selectize_multiple: [],
        checkbox_group: [],
        checkbox_group_from_array: [],
        options_list: [],

        radio_select: null,
        radio_select_from_array: null,
        tinymce: null,

        date: null,
        date_time: null,

        start: null,
        end: null,

        start_time: null,
        end_time: null,


        file: null,
        dropzone: null,

        address: {},
        seo: {}
      },
    }
  },
  computed: {
    errors() {
      if (!this.showFakeErrors) return null
      return {
          text: ['that text is too long'],
          text_required: ['text is required here'],
          email: ['you need a better email address'],
      }
    }
  }
}
</script>

<style>
@import url('bootstrap/dist/css/bootstrap.min.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
