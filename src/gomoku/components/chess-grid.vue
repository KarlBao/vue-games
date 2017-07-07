<template lang="jade">
  div.grid(:style="{backgroundColor: color}", @click="putChess")
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
        default: 0
      }
    },

    data () {
      return {
      }
    },

    computed: {
      color () {
        return this.chess === 1
          ? '#000' : this.chess === 2
          ? '#fff' : 'none'
      },
      myTurn () {
        return this.$store.getters.myTurn
      }
    },

    methods: {
      putChess () {
        if (!this.myTurn) {
          return
        }

        this.$store.dispatch('putChess', {coord: this.coord})
        this.$socket.emit('putChess', this.coord)
      }
    }
  }
</script>
