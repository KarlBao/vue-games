<template lang="jade">
  div.chess-board
    div.row(v-for="x in chessBoard.length")
      chess-grid(
        v-for="grid in chessBoard[x-1]",
        :id="grid.id",
        :coord="{x: grid.x, y: grid.y}",
        :chess="grid.chess",
        :key="grid.id"
      )
</template>

<style lang="stylus">
.row
  overflow: hidden
</style>

<script>
  import ChessGrid from './chess-grid'
  export default {
    props: {
      numOfCols: {
        type: Number,
        default: 10
      },
      numOfRows: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        // code...
      }
    },
    computed: {
      chessBoard () {
        return this.$store.getters.chessBoard
      }
    },
    components: {
      ChessGrid
    },
    mounted () {
      this.$socket.on('initChessBoard', board => {
        this.$store.commit('initChessBoard', board)
      })
    },
    methods: {
      init () {
        this.$socket.emit('init')
      }
    }
  }
</script>
