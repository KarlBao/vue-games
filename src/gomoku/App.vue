<template lang="jade">
  div#app
    router-view  
</template>

<style lang="stylus">
@import 'index.styl'
</style>

<style lang="stylus" scoped>
#app
  width: 100%
  max-width: 1400px
  margin: auto
</style>

<script>
export default {
  name: 'app',
  data () {
    return {
      roomId: null
    }
  }
}
</script>
