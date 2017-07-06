import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex)

const types = {
  INIT_CHESS_BOARD: 'initChessBoard', // 获得初始棋盘状态
  SET_ROLE: 'setRole', // 设置用户角色
  PUT_CHESS: 'putChess' // 放一颗棋子
}

export default new Vuex.Store({
  state: {
    chessBoard: [],
    role: 0 // 0: 观众， 1: 黑子， 2: 白子
  },
  mutations: {
    [types.INIT_CHESS_BOARD] (state, board) {
      state.chessBoard = board
    },
    [types.SET_ROLE] (state, role) {
      state.role = role
    },
    [types.PUT_CHESS] (state, {coord, chess}) {
      let grid = state.chessBoard[coord.x][coord.y]
      grid.chess = chess
    }
  },
  actions: {
    [types.PUT_CHESS] ({commit, getters}, payload) {
      let defaultPayload = {
        coord: {x: 0, y: 0},
        chess: getters.myChess
      }
      payload = Object.assign(defaultPayload, payload)
      const {coord, chess} = payload
      commit(types.PUT_CHESS, {coord, chess})
    }
  },
  getters: {
    chessBoard (state) {
      return _.orderBy(state.chessBoard, 'id')
    },
    myChess (state) {
      let chess = null
      switch (state.role) {
        case 1:
          chess = 1
          break
        case 2:
          chess = 2
          break
        default:
          chess = null
          break
      }
      return chess
    }
  }
})
