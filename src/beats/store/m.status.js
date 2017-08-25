const types = {
  SET_GAME_STATUS: 'setGameStatus',
  SET_CURSOR: 'setCursor'
}

const store = {
  state: {
    status: 0, // 0: 未开始, 1: 游戏中, 2: gameover
    cursor: 'default'
  },
  mutations: {
    [types.SET_GAME_STATUS] (state, status) {
      state.status = status
    },
    [types.SET_CURSOR] (state, cursor) {
      state.cursor = cursor
    }
  },
  actions: {
    startGame ({commit}) {
      commit(types.SET_GAME_STATUS, 1)
    },
    gameOver ({commit}) {
      commit(types.SET_GAME_STATUS, 2)
    },
    setCursor ({commit}, cursor) {
      commit(types.SET_CURSOR, cursor)
    }
  },
  getters: {
    getGameStatus (state) {
      return state.status
    },
    getCursor (state) {
      return state.cursor
    }
  }
}

export default store
