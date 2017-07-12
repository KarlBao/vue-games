<template lang="jade">
  div#app
    common-input
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
import CommonInput from '@/common/components/common-input'
export default {
  name: 'app',
  components: {
    ChessBoard,
    PlayerList,
    CommonInput
  },
  beforeCreate () {
    this.$socket.on('initRole', role => {
      this.$store.commit('setRole', role)
    })
    this.$socket.on('putChess', (coord, chess) => {
      this.$store.dispatch('putChess', {coord, chess})
    })
    this.$socket.on('switchTurn', role => {
      this.$store.commit('setTurn', role)
    })
  },
  mounted () {
    this.$socket.emit('init')
  },
  computed: {
    myTurn () {
      return this.$store.getters.myTurn
    }
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
