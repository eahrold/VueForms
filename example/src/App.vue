<template>
  <div id='app' class="container-fluid">
    <div class="row h-100">
        <Main v-model='model' :show='show'></Main>
        <AsideRight :model='model'>
          <template slot='toggles'>
              <form-checkbox label='Show All Elements' v-model='show.showElementsAll' property='showElementsAll'></form-checkbox>
              <form-checkbox label='Fake Server Response Errors' v-model='show.showFakeErrors' property='showFakeErrors'></form-checkbox>
          </template>
        </AsideRight>
    </div>
  </div>
</template>

<script>

import { ValidationSyncMixin } from 'vue-forms'
import { AsideRight, Main } from './components'

export default {
  name: 'App',
  components: {
    AsideRight,
    Main
  },

  mixins: [
    ValidationSyncMixin,
  ],

  data() {
    return {
      show: {
        showElementsAll: true,
        showFakeErrors: false,
      },

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
        segmented_control_info: 0,
        segmented_control: 0,
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
}
</script>

<style lang='css'>
@import url('bootstrap/dist/css/bootstrap.min.css');
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 2em;
}

.h-100 {
  height: 100%;
}
.o-scroll {
  overflow: scroll;
}

</style>
