class Powerup {
  constructor ({
    name = '???',
    num = 0,
    maxNum = Infinity,
    key = '',
    keyCode = 0
  }) {
    this.name = name
    this.num = num
    this.maxNum = maxNum
    this.key = key
    this.keyCode = keyCode
  }
}

const powerups = {
  freeze: new Powerup({name: 'FREEZE', key: 'Z', keyCode: 90})
}
const types = {
  SET_POWERUPS_NUM: 'setPowerupsNum',
  SET_POWERUPS_NUM_OFFSET: 'setPowerupsNumOffset'
}

const store = {
  state: powerups,
  mutations: {
    [types.SET_POWERUPS_NUM] (state, {powerup, num}) {
      if (num >= 0 && state[powerup]) {
        state[powerup].num = num > state[powerup].maxNum ? state[powerup].maxNum : num
      }
    },
    [types.SET_POWERUPS_NUM_OFFSET] (state, {powerup, offset}) {
      if (state[powerup] !== undefined) {
        let resultNum = state[powerup].num + offset
        if (resultNum < 0) { resultNum = 0 }
        if (resultNum > state[powerup].maxNum) { resultNum = state[powerup].maxNum }
        state[powerup].num = resultNum
      }
    }
  },
  actions: {
    setPowerupNum ({commit}, {powerup, num}) {
      commit(types.SET_POWERUPS_NUM, {powerup, num})
    },
    setPowerupNumOffset ({commit}, {powerup = '', offset = 1}) {
      commit(types.SET_POWERUPS_NUM_OFFSET, {powerup, offset})
    }
  },
  getters: {
    getPowerups (state) {
      return state
    }
  }
}

export default store
