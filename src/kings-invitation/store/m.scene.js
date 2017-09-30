const types = {
  SHOW_PREV_SCENE: 'showPrevScene',
  SHOW_NEXT_SCENE: 'showNextScene',
  SHOW_SCENE: 'showScene'
}

const store = {
  state: {
    sceneIndex: 0
  },
  mutations: {
    [types.SHOW_PREV_SCENE] (state) {
      if (state.sceneIndex > 0) {
        state.sceneIndex--
      }
    },
    [types.SHOW_NEXT_SCENE] (state) {
      state.sceneIndex++
    },
    [types.SHOW_SCENE] (state, i) {
      state.sceneIndex = i
    }
  },
  actions: {
    showPrevScene ({commit}) {
      commit(types.SHOW_PREV_SCENE)
    },
    showNextScene ({commit}) {
      commit(types.SHOW_NEXT_SCENE)
    },
    showScene ({commit}, index) {
      commit(types.SHOW_SCENE, index)
    }
  },
  getters: {
    sceneIndex (state) {
      return state.sceneIndex
    }
  }
}

export default store
