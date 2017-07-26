<template lang="jade">
  div.hall
    router-link(to="/room/2") 到2号房间
</template>

<style lang="stylus" scoped>

</style>

<script>
  export default {
    data () {
      return {
        rooms: []
      }
    },
    mounted () {
      // code...
    }
  }
</script>
