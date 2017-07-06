<template lang="jade">
  div.chess-board
    div.row(v-for="y in numOfRows")
      chess-grid(
        v-for="x in numOfCols",
        :coord="{x: x-1, y: y-1}",
        :key="x + y"
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
    components: {
      ChessGrid
    }
  }
</script>
