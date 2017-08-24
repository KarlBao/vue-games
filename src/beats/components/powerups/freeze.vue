<template lang="jade">
  transition(name="freeze")
    div.freeze(v-if="isFreezing")
</template>

<style lang="stylus" scoped>
  .freeze
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: -1
    background-color: #80d8ff
    pointer-events: none
    opacity: .3
  .freeze-enter,
  .freeze-leave-to
    opacity: 0
  .freeze-enter-to,
  .freeze-leave
    opacity: .3
  .freeze-enter-active,
  .freeze-leave-active
    transition: opacity .2s ease-in
</style>

<script>
  import powerupMixin from './mixin'
  import EventBus from '@/common/utils/EventBus'
  export default {
    mixins: [powerupMixin],
    data () {
      return {
        isFreezing: false,
        duration: 2000 // ms
      }
    },
    methods: {
      usePowerup () {
        if (this.isFreezing) { return false }
        this.isFreezing = true
        EventBus.$emit('changeLaserSpeedRate', 0)
        setTimeout(() => {
          EventBus.$emit('changeLaserSpeedRate', 1)
          this.isFreezing = false
        }, this.duration)
      }
    }
  }
</script>
