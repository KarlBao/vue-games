class Laser {
  constructor ({
    from = 'random',
    speed = 10
  }) {
    this.from = from
    this.speed = speed
  }
}

class Level {
  constructor ({
    points = 5,
    lasers = [new Laser()]
  }) {
    this.points = points
    this.lasers = lasers
  }
}

const levels = {
  1: new Level({
    lasers: [
      new Laser({
        from: 'left'
      })
    ]
  }),
  2: new Level({
    lasers: [
      new Laser({
        from: 'right'
      })
    ]
  }),
  3: new Level({
    points: 6,
    lasers: [
      new Laser({
        from: 'top',
        speed: 15
      })
    ]
  }),
  4: new Level({
    points: 6,
    lasers: [
      new Laser({
        from: 'bottom',
        speed: 15
      })
    ]
  }),
  5: new Level({
    lasers: [
      new Laser({
        from: 'bottom',
        speed: 15
      }),
      new Laser({
        from: 'left',
        speed: 15
      })
    ]
  }),
  6: new Level({
    lasers: [
      new Laser({
        from: 'top',
        speed: 10
      }),
      new Laser({
        from: 'left',
        speed: 10
      }),
      new Laser({
        from: 'right',
        speed: 10
      }),
      new Laser({
        from: 'bottom',
        speed: 10
      })
    ]
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
