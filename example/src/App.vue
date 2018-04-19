<template>
  <div id='app' class="container-fluid">
    <div class="row h-100">
        <Main v-model='model' v-bind='{statuses, status, show, fakeErrors, validation}'></Main>
        <AsideRight v-bind="{model, validation}">
          <template slot='toggles'>
              <form-checkbox label='Show All Elements' v-model='show.showElementsAll' property='showElementsAll'></form-checkbox>
              <form-checkbox label='Fake Server Response Errors' :value='show.showFakeErrors' @input='toggleFakeErrors' property='showFakeErrors'></form-checkbox>
              <form-select v-model='status' :options='statuses' property='status' :label='false'></form-select>
          </template>
        </AsideRight>
    </div>
  </div>
</template>

<script>

import { ValidatorStore } from 'vue-forms'
import { AsideRight, Main } from './components'

const validation = new ValidatorStore();

export default {
  name: 'App',
  components: {
    AsideRight,
    Main
  },

  mixins: [
  ],

  data() {
    return {
      validation,
      status: 'success',
      show: {
        showElementsAll: true,
        showFakeErrors: false,
      },

      model: {
        id: 12345,
        text: null,
        text_required: null,
        text_required_local: null,

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
        segmented_control_info: 0,
        segmented_control: 0,
        options_list: [],

        radio_select: null,
        radio_select_from_array: null,

        tinymce: null,
        ckeditor: null,

        date: null,
        date_time: null,

        start: null,
        end: null,

        start_time: null,
        end_time: null,

        status: 2,

        file: null,
        dropzone: null,
        basic_file: [],

        address: {},
        seo: {}
      },
    }
  },

  computed: {
    fakeErrors() {
      return {
          text: ['that text is too long'],
          text_required: ['text is required here'],
          email: ['you need a better email address'],
      }
    },

    statuses() {
      return {
        'success' : 'Success',
        'info' : 'Info',
        'warning' : 'Warning',
        'danger' : 'Danger',
        'primary' : 'Primary',
      }
    },
  },

  methods: {
    toggleFakeErrors(newVal) {
      this.show.showFakeErrors = newVal;
      if (newVal) {
        this.$vfalert.error("The form is invalid", { errors: this.fakeErrors})
      }
    }
  }
}
</script>

<style lang='scss'>

/* For Bootstrap 3 */
$icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
@import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';

// /* For Bootstrap 4 */
// @import '~bootstrap/scss/bootstrap';


#app {
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-right: 2em;
  padding-left: 2em;
  background: rgba(209, 199, 179, 0.24);
}

.vf-form-section {
  background: white;
  padding: 1em;
  margin-bottom: 2em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.h-100 {
  height: 100%;
}
.o-scroll {
  overflow: scroll;
  padding-top: 2em;
}

</style>
