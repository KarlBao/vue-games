class Powerup {
  constructor ({
    name = '???',
    num = 0,
    maxNum = 999
  }) {
    this.name = name
    this.num = num
    this.maxNum = maxNum
  }
}

const powerups = {
  freeze: new Powerup({name: 'FREEZE'})
}
const types = {
  SET_POWERUPS_NUM: 'setPowerupsNum'
}

const store = {
  state: powerups,
  mutations: {
    [types.SET_POWERUPS_NUM] (state, powerup, offset) {
      if (state[powerup] !== undefined) {
        let resultNum = state[powerup].num + offset
        if (resultNum < 0) { resultNum = 0 }
        if (resultNum > state[powerup].maxNum) { resultNum = state[powerup].maxNum }
        state[powerup].num = resultNum
      }
    }
  },
  actions: {
    setPowerupNum ({commit}, powerup, offset = 1) {
      commit(types.SET_POWERUPS_NUM, powerup, offset)
    }
  },
  getters: {
    getPowerups (state, powerup = '') {
      if (powerup === '' || !state[powerup]) {
        return state
      } else {
        return state[powerup]
      }
    }
  }
}

export default store
