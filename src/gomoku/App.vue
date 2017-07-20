<template lang="jade">
  div#app
    div#main
      div.turn-alert(:class="[myTurn ? 'turn' : 'wait']")
      player-list
      chess-board(
        :num-of-rows="10",
        :num-of-cols="10"
      )
</template>

<style lang="stylus" scoped>
#main
  position: relative
  width: 1200px
  margin: 0 auto
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
import ChessBoard from './components/chess-board'
import PlayerList from './components/player-list'

export default {
  name: 'app',
  components: {
    ChessBoard,
    PlayerList
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
  data () {
    return {
      showPopup: false,
      username: undefined
    }
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
      this.$socket.emit('enter')
      this.$socket.emit('init')
    }
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
