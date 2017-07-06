<template lang="jade">
  div.grid
    slot(name="chess")
</template>

<style lang="stylus">
.grid
  float: left
  width: 50px
  height: 50px
  border: 1px solid #888
  cursor: pointer

</style>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      coord: {
        type: Object,
        required: true
      },
      onUpdate: {
        type: Function,
        default: () => {}
      },
      type: {
        type: String,
        default: 'normal'
      },
      enabled: {
        type: Boolean,
        default: false
      },
      chess: {
        type: Number, // 0: empty, 1: black, 2: white
      }
    },

    data () {
      return {
      }
    },

    methods: {
      putChess () {
        this.$store.commit('updateChessBoard', this.id)
      }
    }
  }
</script>
