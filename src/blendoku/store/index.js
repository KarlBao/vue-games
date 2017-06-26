import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const ADD_ACTIVE_BLOCK = 'addActiveBlock'
const CLEAR_ACTIVE_BLOCK = 'clearActiveBlocks'

export default new Vuex.Store({
  state: {
    activeBlocks: []
  },
  mutations: {
    [ADD_ACTIVE_BLOCK] (state, activeBlock) {
      state.activeBlocks.push(activeBlock)
    },
    [CLEAR_ACTIVE_BLOCK] (state) {
      state.activeBlocks = []
    }
  }
})
