import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Levels from './m.levels'
import Hearts from './m.hearts'
import Score from './m.score'

export default new Vuex.Store({
  modules: {
    Levels,
    Hearts,
    Score
  }
})
