<template lang="jade">
div#room
  a(@click="showExitPopup=true") 退出
  div.turn-alert(:class="[myTurn ? 'turn' : 'wait']")
  player-list
  chess-board(
    :num-of-rows="10",
    :num-of-cols="10"
  )
  popup-modal(
    :show="showExitPopup",
    @confirm="leaveRoom",
    @cancel="showExitPopup=false"
  )
    p 确认要退出该房间吗？
</template>

<style lang="stylus" scoped>
#room
  position: relative
  width: 1200px
  margin: 60px auto
.turn-alert
  width: 20px
  height: 20px
  border-radius: 10px
  margin: 50px auto
  &.turn
    background-color: green
  &.wait
    background-color: red
</style>

<script>
import PopupModal from '@/common/components/popup-modal'
import ChessBoard from './chess-board'
import PlayerList from './player-list'

export default {
  data () {
    return {
      showExitPopup: false,
      roomId: null
    }
  },
  components: {
    ChessBoard,
    PlayerList,
    PopupModal
  },
  beforeCreate () {
    this.$socket.on('setSocket', socketId => {
      this.$store.commit('setSocket', socketId)
    })
    this.$socket.on('putChess', (coord, chess) => {
      this.$store.dispatch('putChess', {coord, chess})
    })
    this.$socket.on('setTurn', role => {
      this.$store.commit('setTurn', role)
    })
    this.$socket.on('getWinner', role => {
      alert(`Winner is ${role}`)
    })
  },
  mounted () {
    this.enterRoom()
  },
  computed: {
    myTurn () {
      return this.$store.getters.myTurn
    }
  },
  methods: {
    enterRoom () {
      this.roomId = this.$route.params.id
      if (!this.roomId) {
        return
      }
      this.$socket.emit('enter', this.roomId)
      this.$socket.emit('init')
    },
    leaveRoom () {
      this.showExitPopup = false
      this.$socket.emit('leave')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
