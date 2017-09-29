<template lang="jade">
  div#app
    img(src="./assets/logo.png")
    scene(:index="sceneIndex")
</template>

<script>
import Scene from './components/scene'

export default {
  name: 'app',
  computed: {
    sceneIndex () {
      return this.$store.getters.sceneIndex
    }
  },
  components: {
    Scene
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
