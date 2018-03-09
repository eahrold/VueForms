// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

window.$ = window.jQuery = require('jquery')
// require('bootstrap')
require('bootstrap-sass')

import moment from 'moment'
window.moment = moment

import _ from 'lodash'
window._ = _

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import { VueForms, dateFormats } from 'vue-forms'

let tinymceConfig = {
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualchars code',
        'visualblocks fullscreen textcolor',
        'insertdatetime media table contextmenu paste imagetools'
    ],
    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
    toolbar: `
        undo redo | insert code | bold italic | alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | link image vf_image_picker | styleselect fontselect fontsizeselect forecolor | visualblocks code
    `,
    menubar: false,
    css: ''
}


let headers = {}
const token = document.head.querySelector('meta[name="csrf-token"]');
if( !! token) {
    headers['X-CSRF-TOKEN'] = token.content
}
const apiToken = document.head.querySelector('meta[name="api-token"]');
if ( !! apiToken) {
    headers['Authorization'] = `Bearer ${apiToken.content}`
}

let options = {
    headers: headers,
    tinymce: {
      //apiKey: "YOUR_API_KEY", // We use this under the hood https://github.com/tinymce/tinymce-vue
      config: tinymceConfig
    },
    format: {
        dateValueFormat: dateFormats.LARAVEL_TIMESTAMP_FORMAT,
    },
    endpoints: {
        upload: '/example/api/upload',
        files:  {
            default: '/static/json/files.json',
            images: '/static/json/images.json'
        }
    }
}
Vue.use(VueForms, options)

/* eslint-disable no-new */
new Vue({
  el: '#example-app',
  components: { App },
  template: '<App/>'
})
