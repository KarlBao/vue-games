// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import socket from '@/common/utils/socket'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css'
import '@/common/style/icon-font/css/icon-font-embedded.css'

Vue.config.productionTip = false

Vue.use(socket, {
  namespace: 'gomoku'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
