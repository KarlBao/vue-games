const types = {
  SHOW_PREV_SCENE: 'showPrevScene',
  SHOW_NEXT_SCENE: 'showNextScene'
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
    }
  },
  actions: {
    showPrevScene ({commit}) {
      commit(types.SHOW_PREV_SCENE)
    },
    showNextScene ({commit}) {
      commit(types.SHOW_NEXT_SCENE)
    }
  },
  getters: {
    sceneIndex (state) {
      return state.sceneIndex
    }
  }
}

export default store
