<template lang="jade">
  div#app
    div.heart-ctnr
      div.dp-i-block.v-middle.heart(v-for="i in hearts")
    div.score-ctnr
      span SCORE : 
      span {{ score }}
    mu-raised-button.start-btn(v-if="!started", label="PLAY", @click="start", secondary)
    level(
      v-if="started && level && !gameover",
      :level-num="currentLevel",
      :num-of-points="level.points",
      :lasers="level.lasers",
      @complete="nextLevel"
    )
    mu-dialog(
      :open="gameover || !level",
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
</style>

<script>
import Level from './components/level'
export default {
  name: 'app',
  data () {
    return {
      started: false,
      currentLevel: 1
    }
  },
  computed: {
    level () {
      return this.$store.getters.getLevels[this.currentLevel] || undefined
    },
    hearts () {
      return this.$store.getters.getHearts
    },
    score () {
      return this.$store.getters.getScore
    },
    gameover () {
      return this.hearts === 0
    }
  },
  components: {
    Level
  },
  methods: {
    nextLevel () {
      this.currentLevel++
    },
    start () {
      this.started = true
      this.currentLevel = 1
      this.$store.dispatch('fillHearts')
      this.$store.dispatch('clearScore')
    }
  }
}
</script>
