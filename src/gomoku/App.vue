<template lang="jade">
  div#app
    div.turn-alert(:class="[myTurn ? 'turn' : 'wait']")
    chess-board(
      :num-of-rows="10",
      :num-of-cols="10"
    )
</template>

<style lang="stylus">
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

export default {
  name: 'app',
  components: {
    ChessBoard
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
