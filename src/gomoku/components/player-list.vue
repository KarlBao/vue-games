<template lang="jade">
  div.player-list
    ul
      li(v-for="player in playerList")
        {{player.socketId}}
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      playerList () {
        return this.$store.state.playerList
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
