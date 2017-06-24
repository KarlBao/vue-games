<template lang="jade">
  div#app
    img(src="./assets/logo.png")
    hello
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
