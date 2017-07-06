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
  mounted () {
    this.$socket.emit('init')
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
