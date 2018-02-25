<template>
  <form-section heading='Dropzone and File'>
    <form-file-picker
      v-model='model.file_picker'
      property='file_picker'
      src-key='path'
      btn-text="Choose an example document"
      :errors='errors'>
    </form-file-picker>

    <form-file-picker
      v-model='model.file_picker_2'
      property='file_picker_2'
      src-key='path'
      btn-text="Choose a Vue.js logo"
      :endpoint='$vfconfig.filesEndpoint("images")'
      :errors='errors'>
    </form-file-picker>

    <form-dropzone
        v-model='model.dropzone'
        label='File'
        property='images'
        type='SOME_MODEL_TYPE'
        :file-types='$vfconfig.fileTypes.any'
        :id='model.id'
        :errors='errors'>
    </form-dropzone>

    <form-dropzone-button
        v-model='model.dropzone'
        label='File'
        property='images'
        type='SOME_MODEL_TYPE'
        :limit='3'
        :file-types='$vfconfig.fileTypes.any'
        :id='model.id'
        :errors='errors'>
    </form-dropzone-button>
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
