<template lang="jade">
  div#app
    chess-board(
      :num-of-rows="10",
      :num-of-cols="10"
    )
</template>

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
  },
  mounted () {
    this.$socket.emit('init')
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
