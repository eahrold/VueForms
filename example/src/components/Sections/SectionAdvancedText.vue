<template>
  <form-section heading='Advanced Text Editors'>
    <form-ckeditor label='CKeditor' v-model='model.ckeditor' property='ckeditor'></form-ckeditor>
    <form-tinymce label='Tinymce' v-model='model.tinymce' property='tinymce'></form-tinymce>
    <form-markdown label='Markdown' v-model='model.markdown' property='markdown'></form-markdown>
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
