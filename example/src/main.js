// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

window.$ = window.jQuery = require('jquery')
require('bootstrap')

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import { VueForms } from 'vue-forms'

let options = {
    headers: {},
    endpoints: {
        upload: '/api/uploads',
        file:  '/api/file-list'
    }
}

const token = document.head.querySelector('meta[name="csrf-token"]');
if( !! token) {
    options.headers['X-CSRF-TOKEN'] = token.content
}

const apiToken = document.head.querySelector('meta[name="api-token"]');
if ( !! apiToken) {
    options.headers['Authorization'] = `Bearer ${apiToken.content}`
}

Vue.use(VueForms, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
