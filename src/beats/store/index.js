import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Levels from './m.levels'
import Hearts from './m.hearts'
import Score from './m.score'
import Powerups from './m.powerups'
import Status from './m.status'

export default new Vuex.Store({
  modules: {
    Levels,
    Hearts,
    Score,
    Powerups,
    Status
  }
})
