const types = {
  SET_GAME_STATUS: 'setGameStatus'
}

const store = {
  state: {
    status: 0 // 0: 未开始, 1: 游戏中, 2: gameover
  },
  mutations: {
    [types.SET_GAME_STATUS] (state, status) {
      state.status = status
    }
  },
  actions: {
    startGame ({commit}) {
      commit(types.SET_GAME_STATUS, 1)
    },
    gameOver ({commit}) {
      commit(types.SET_GAME_STATUS, 2)
    }
  },
  getters: {
    getGameStatus (state) {
      return state.status
    }
  }
}

export default store
