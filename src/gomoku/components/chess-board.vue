<template lang="jade">
  div.chess-board
</template>

<script>
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
    }
  }
</script>