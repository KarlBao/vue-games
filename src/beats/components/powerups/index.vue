<template lang="jade">
  div.powerup-ctnr
    div.powerup-list
      div.powerup(v-for="powerup in powerups")
        span.key {{powerup.key}} 
        span : 
        span {{powerup.name}} x {{powerup.num}}
    
    freeze(name="freeze")
    blast(name="blast")
</template>

<style lang="stylus" scoped>
.key
  color: #64b5f6
.powerup
  color: #fff
</style>

<script>
  import Freeze from './freeze'
  import Blast from './blast'
  export default {
    computed: {
      powerups () {
        return this.$store.getters.getPowerups
      }
    },
    components: {
      Freeze,
      Blast
    }
  }
</script>
