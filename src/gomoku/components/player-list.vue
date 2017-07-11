<template lang="jade">
  div.player-list
    h2 当前：
    ul
      li.player
        span 黑子：
        span(v-if="blackPlayer") {{blackPlayer.socketId}}
        span.placeholder(v-else) 等待进入...
      li.player
        span 白子：
        span(v-if="whitePlayer") {{whitePlayer.socketId}}
        span.placeholder(v-else) 等待进入...
</template>

<style lang="stylus" scoped>
  .player-list
    position: absolute
    top: 70px
    left: 0
    text-align: left
    .player
      margin: 10px 0
  ul
    padding-left: 0
    list-style: none
  
  .placeholder
    color: #ccc
</style>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      playerList () {
        return this.$store.state.playerList
      },
      blackPlayer () {
        return this.$store.getters.blackPlayer
      },
      whitePlayer () {
        return this.$store.getters.whitePlayer
      }
    },
    beforeCreate () {
      this.$socket.on('updatePlayerList', list => {
        console.log(list)
        this.$store.commit('updatePlayerList', list)
      })
    }
  }
</script>
