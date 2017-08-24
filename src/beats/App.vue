<template lang="jade">
  div#app
    div.heart-ctnr
      div.dp-i-block.v-middle.heart(v-for="i in hearts")
    div.score-ctnr
      span SCORE : 
      span {{ score }}
    powerups.powerups(v-if="status === 1")
    mu-raised-button.start-btn(v-if="status === 0", label="PLAY", @click="start", secondary)
    level(
      v-if="level && status === 1",
      :level-num="currentLevel",
      :num-of-points="level.points",
      :lasers="level.lasers",
      @complete="nextLevel"
    )
    mu-dialog(
      :open="status === 2",
      title="Game Over"
    )
      span YOUR SCORE: {{ score }}
      mu-flat-button(slot="actions", @click="start", label="REPLAY")
</template>

<style lang="stylus">
@import 'index.styl'
</style>

<style lang="stylus" scoped>
.heart-ctnr
  position: absolute
  left: 20px
  top: 20px
.heart
  width: 14px
  height: 14px
  border-radius: 50%
  margin-right: 10px
  background-color: #d32f2f
.score-ctnr
  position: absolute
  top: 0
  left: 20px
  color: #fff
.start-btn
  position: absolute
  top: 50%
  left: 50%
  width: 200px
  height: 70px
  margin-top: -35px
  margin-left: -100px
  font-size: 24px
.powerups
  position: absolute
  top: 0
  right: 20px
</style>

<script>
import Powerups from './components/powerups'
import Level from './components/level'
export default {
  name: 'app',
  data () {
    return {
      started: false
    }
  },
  computed: {
    status () {
      return this.$store.getters.getGameStatus
    },
    currentLevel () {
      return this.$store.getters.getCurrentLevelNum
    },
    level () {
      return this.$store.getters.getLevels[this.currentLevel] || undefined
    },
    hearts () {
      return this.$store.getters.getHearts
    },
    score () {
      return this.$store.getters.getScore
    }
  },
  watch: {
    hearts (n) {
      if (n <= 0) {
        this.gameOver()
      }
    }
  },
  components: {
    Powerups,
    Level
  },
  methods: {
    nextLevel () {
      this.$store.dispatch('nextLevel')
    },
    start () {
      this.$store.dispatch('startGame')
      this.$store.dispatch('resetLevel')
      this.$store.dispatch('fillHearts')
      this.$store.dispatch('clearScore')
      this.$store.dispatch('setPowerupNum', {powerup: 'freeze', num: 2})
    },
    gameOver () {
      this.$store.dispatch('gameOver')
    }
  }
}
</script>
