// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import 'normalize.css'

/**
 * 引入muse-ui组件库：
 */
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
/**
 * 引入muse-ui主题：
 */
// import 'muse-ui/dist/theme-default.css'
// import 'muse-ui/dist/theme-light.css'
import 'muse-ui/dist/theme-dark.css'
// import 'muse-ui/dist/theme-carbon.css'
// import 'muse-ui/dist/theme-teal.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
