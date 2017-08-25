const types = {
  ADD_POINT: 'addPoint',
  REMOVE_POINT: 'removePoint',
  CLEAR_POINTS: 'clearPoints'
}
let points = []

const store = {
  state: points,
  mutations: {
    [types.ADD_POINT] (state, point) {
      state.push(point)
    },
    [types.REMOVE_POINT] (state, id) {
      state = state.filter(point => point.id !== id)
      // state.pop()
    },
    [types.CLEAR_POINTS] (state) {
      state = []
    }
  },
  actions: {
    addPoint ({commit}, point) {
      commit(types.ADD_POINT, point)
    },
    removePoint ({commit}, id) {
      commit(types.REMOVE_POINT, id)
    },
    clearPoints ({commit}) {
      commit(types.CLEAR_POINTS)
    }
  },
  getters: {
    getActivePoints (state) {
      return state
    },
    getPointsX (state) {
      return state.map(point => point.left)
    },
    getPointsY (state) {
      return state.map(point => point.top)
    }
  }
}

export default store
