<template lang="jade">
  div#app
    img(src="./assets/logo.png")
    hello
</template>

<script>
import Hello from './components/Hello'
import { socket } from '@/common/service/socket'

export default {
  name: 'app',
  components: {
    Hello
  },
  mounted () {
    socket.emit('sayhi')
    socket.on('sayhi', msg => {
      console.log(`Say hi from server, socket id : ${msg}`)
    })
  }
}
</script>

<style lang="stylus">
@import 'index.styl'
</style>
