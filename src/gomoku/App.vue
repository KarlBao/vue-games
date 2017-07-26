<template lang="jade">
  div#app
    transition(name="fade-in-left")
      router-view
</template>

<style lang="stylus">
@import 'index.styl'
@import '~@/common/style/transition.styl'
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
