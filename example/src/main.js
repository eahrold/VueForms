// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

window.$ = window.jQuery = require('jquery')
require('bootstrap')

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import { VueForms } from 'vue-forms'

Vue.use(VueForms)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
