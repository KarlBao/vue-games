// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import socket from '@/common/utils/socket'

Vue.config.productionTip = false

Vue.use(socket, {
  namespace: 'gomoku'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
