<template lang="jade">
  div.grid
    slot(name="chess")
</template>

<style lang="stylus">
.grid
  float: left
  width: 50px
  height: 50px
  border: 1px solid #888
  cursor: pointer

</style>

<script>
  export default {
    props: {
      coord: {
        type: Object,
        required: true
      },
      onUpdate: {
        type: Function,
        default: () => {}
      },
      type: {
        type: String,
        default: 'normal'
      }
    },

    data () {
      return {}
    }
  }
</script>
