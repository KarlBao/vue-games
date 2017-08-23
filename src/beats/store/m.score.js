const types = {
  ADD_SCORE: 'addScore',
  CLEAR_SCORE: 'clearScore'
}

const store = {
  state: {
    score: 0
  },
  mutations: {
    [types.ADD_SCORE] (state, n = 1) {
      state.score = state.score + n
    },
    [types.CLEAR_SCORE] (state) {
      state.score = 0
    }
  },
  actions: {
    addScore ({ commit }, n = 1) {
      commit(types.ADD_SCORE, n)
    },
    clearScore ({ commit }) {
      commit(types.CLEAR_SCORE)
    }
  },
  getters: {
    getScore (state) {
      return state.score
    }
  }
}

export default store
