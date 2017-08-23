const types = {
  REDUCE_HEARTS: 'reduceHeart',
  ADD_HEARTS: 'addHeart',
  FILL_HEARTS: 'fillHeart' // 老板，加满
}

const store = {
  state: {
    hearts: 6,
    maxHearts: 6
  },
  mutations: {
    [types.REDUCE_HEARTS] (state, n) {
      state.hearts = state.hearts >= n ? state.hearts - n : 0
    },
    [types.ADD_HEARTS] (state, n) {
      state.hearts = state.hearts <= state.maxHearts - n ? state.hearts + n : state.maxHearts
    },
    [types.FILL_HEARTS] (state) {
      state.hearts = state.maxHearts
    }
  },
  actions: {
    reduceHearts ({ commit }, n = 1) {
      commit(types.REDUCE_HEARTS, n)
    },
    addHearts ({commit}, n = 1) {
      commit(types.ADD_HEARTS, n)
    },
    fillHearts ({commit}) {
      commit(types.FILL_HEARTS)
    }
  },
  getters: {
    getHearts (state) {
      return state.hearts
    }
  }
}

export default store
