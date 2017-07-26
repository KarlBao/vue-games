<template lang="jade">
  div.chess-board
    div.row(v-for="x in chessBoard.length")
      chess-grid(
        v-for="grid in chessBoard[x-1]",
        :id="grid.id",
        :coord="{x: grid.x, y: grid.y}",
        :chess="grid.chess",
        :key="grid.id + '' + grid.chess",
        :total-cols="chessBoard.length",
        :total-rows="chessBoard[x-1].length"
      )
    span.center-point
</template>

<style lang="stylus" scoped>
.chess-board
  position: relative
  display: inline-block
  vertical-align: top
  background-color: #d0c7b8
  .center-point
    position: absolute
    top: 50%
    left: 50%
    width: 10px
    height: 10px
    border-radius: 50%
    margin-left: -5px
    margin-top: -5px
    background-color: #eee
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
