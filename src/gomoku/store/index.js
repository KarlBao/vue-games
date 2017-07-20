import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
Vue.use(Vuex)

const types = {
  INIT_CHESS_BOARD: 'initChessBoard', // 获得初始棋盘状态
  SET_SOCKET: 'setSocket', // 设置用户初始信息
  PUT_CHESS: 'putChess', // 放一颗棋子
  SET_TURN: 'setTurn',
  UPDATE_PLAYER_LIST: 'updatePlayerList', // 刷新玩家列表
  GET_USERNAME: 'getUsername' // 获取用户昵称
}

export default new Vuex.Store({
  state: {
    chessBoard: [],
    turn: -1, // 1: 黑子， 2: 白子
    playerList: [],
    socketId: null
  },
  mutations: {
    [types.INIT_CHESS_BOARD] (state, board) {
      state.chessBoard = board
    },
    [types.SET_SOCKET] (state, sid) {
      state.socketId = sid
    },
    [types.PUT_CHESS] (state, {coord, chess}) {
      let grid = state.chessBoard[coord.y][coord.x]
      grid.chess = chess
    },
    [types.SET_TURN] (state, role) {
      state.turn = role
    },
    [types.UPDATE_PLAYER_LIST] (state, list) {
      state.playerList = list
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
    // 当前玩家信息
    player (state) {
      return state.playerList.find(player => player.socketId === state.socketId)
    },
    role (state, getters) {
      return getters.player ? getters.player.role : 0 // 0: 观众， 1: 黑子， 2: 白子
    },
    myChess (state, getters) {
      let chess = null
      switch (getters.role) {
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
    },
    myTurn (state, getters) {
      return state.turn === getters.role
    },
    blackPlayer (state) {
      return state.playerList.find(player => player.role === 1)
    },
    whitePlayer (state) {
      return state.playerList.find(player => player.role === 2)
    }
  }
})
