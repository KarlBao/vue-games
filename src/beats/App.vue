<template lang="jade">
  div#app
    level(
      :level-num="currentLevel",
      :num-of-points="level.points",
      :num-of-lasers="level.lasers",
      @complete="nextLevel"
    )
</template>

<style lang="stylus">
@import 'index.styl'
</style>

<script>
import Level from './components/level'
export default {
  name: 'app',
  data () {
    return {
      currentLevel: 1
    }
  },
  computed: {
    level () {
      return this.$store.getters.getLevels[this.currentLevel]
    }
  },
  components: {
    Level
  },
  methods: {
    nextLevel () {
      this.currentLevel++
    }
  }
}
</script>
