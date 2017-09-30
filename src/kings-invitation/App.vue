<template lang="jade">
  div#app
    transition(name="fade-in")
      div#main(v-if="ready")
        div.bg
        scene(:index="sceneIndex", @gameover="gameover")
        mu-dialog(:open="isGameover", title="GAME OVER")
          span 恭喜你受到了王の盛邀
          mu-flat-button(label="再玩一次", slot="actions", primary, @click="restart")
</template>

<style lang="stylus" scoped>
  #app
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #fff
  #main
    width: 100%
    height: 100%
    background-color: #000
    transition: opacity 5s ease-in-out
  .bg
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    // background-image: url('./assets/bg.jpg')
    background-size: cover
    background-position: top center
    filter: blur(10px)
    transform: scale(1.1, 1.1)
  
  .fade-in-enter
    opacity: 0
  .fade-in-enter-to
    opacity: 1
</style>

<script>
import Scene from './components/scene'

export default {
  name: 'app',
  data () {
    return {
      ready: false,
      isGameover: false
    }
  },
  computed: {
    sceneIndex () {
      return this.$store.getters.sceneIndex
    }
  },
  components: {
    Scene
  },
  mounted () {
    this.ready = true
  },
  methods: {
    gameover () {
      this.isGameover = true
    },
    restart () {
      window.location.reload()
    }
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
