class Level {
  constructor ({
    points = 5,
    lasers = 1,
    from = 'random',
    speed = 10
  }) {
    this.points = points
    this.lasers = lasers
    this.from = from
    this.speed = speed
  }
}

const levels = {
  1: new Level({
    from: 'left'
  }),
  2: new Level({
    from: 'right'
  }),
  3: new Level({
    from: 'top',
    speed: 15
  }),
  4: new Level({
    from: 'bottom',
    speed: 15
  }),
  5: new Level({
    from: 'left',
    speed: 20
  })
}

const types = {
  GET_LEVEL: 'getLevel'
}

const store = {
  state: levels,
  mutations: {
    [types.GET_LEVEL] (state, n) {
      return state[n]
    }
  },
  actions: {
    getLevel ({ commit }, levelNum) {
      commit(types.GET_LEVEL, levelNum)
    }
  },
  getters: {
    getLevels (state) {
      return state
    }
  }
}

export default store
