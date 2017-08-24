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
        from: 'right',
        speed: 10
      }),
      new Laser({
        from: 'left',
        speed: 10
      })
    ]
  }),
  6: new Level({
    lasers: [
      new Laser({
        from: 'top',
        speed: 8
      }),
      new Laser({
        from: 'left',
        speed: 8
      }),
      new Laser({
        from: 'right',
        speed: 8
      }),
      new Laser({
        from: 'bottom',
        speed: 8
      })
    ]
  }),
  7: new Level({
    points: 10,
    lasers: [
      new Laser({
        from: 'right',
        speed: 15
      })
    ]
  }),
  8: new Level({
    points: 10,
    lasers: [
      new Laser({
        from: 'bottom',
        speed: 15
      })
    ]
  }),
  9: new Level({
    points: 10,
    lasers: [
      new Laser({
        from: 'right',
        speed: 10
      }),
      new Laser({
        from: 'left',
        speed: 10
      })
    ]
  }),
  10: new Level({
    points: 10,
    lasers: [
      new Laser({
        from: 'top',
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
  NEXT_LEVEL: 'nextLevel',
  RESET_LEVEL: 'resetLevel'
}

const store = {
  state: {
    levels: levels,
    currentLevel: 1
  },
  mutations: {
    [types.NEXT_LEVEL] (state) {
      state.currentLevel++
    },
    [types.RESET_LEVEL] (state) {
      state.currentLevel = 1
    }
  },
  actions: {
    nextLevel ({ commit }) {
      commit(types.NEXT_LEVEL)
    },
    resetLevel ({commit}) {
      commit(types.RESET_LEVEL)
    }
  },
  getters: {
    getLevels (state) {
      return state.levels
    },
    getCurrentLevelNum (state) {
      return state.currentLevel
    }
  }
}

export default store
