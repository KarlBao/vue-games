<template lang="jade">
  div.player-list
    h2 当前：
    ul
      li.player
        span 黑子：
        span(v-if="blackPlayer") {{blackPlayer.name}}
          span(v-show="currentTurn === 1") <
        span.placeholder(v-else) 等待进入...

      li.player
        span 白子：
        span(v-if="whitePlayer") {{whitePlayer.name}}
          span(v-show="currentTurn === 2") <
        span.placeholder(v-else) 等待进入...

    common-button(v-if="(!whitePlayer || !blackPlayer) && role === 0" @click.native="join") 加入
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
  import CommonButton from '@/common/components/common-button'
  import localName from './../service/srv.localName'

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
      },
      role () {
        return this.$store.getters.role
      },
      currentTurn () {
        return this.$store.state.turn
      }
    },
    beforeCreate () {
      this.$socket.on('updatePlayerList', list => {
        this.$store.commit('updatePlayerList', list)
      })
    },
    components: {
      CommonButton
    },
    methods: {
      join () {
        let username = localName.get('gomoku')
        if (!username) {
          localName.set('gomoku', name => {
            this.$socket.emit('join', name)
          })
        } else {
          this.$socket.emit('join', username)
        }
      }
    }
  }
</script>
