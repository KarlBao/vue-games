<template lang="jade">
transition(:name="transitionName")
  div.dp-i-block.beat-point(
    @mousedown="tap",
    :style="{width: diameter+'px', height: diameter+'px', marginTop: '-'+diameter/2+'px', marginLeft: '-'+diameter/2+'px', top: top+'%', left: left+'%'}"
  )
</template>

<style lang="stylus">
@keyframes breathe
  0%
    background-color: #03a9f4
  50%
    background-color: #4fc3f7
  100%
    background-color: #03a9f4
</style>

<style lang="stylus" scoped>
.beat-point
  position: absolute
  border-radius: 50%
  animation: breathe 2s ease-in-out infinite

.tap-leave
  opacity: 1
  transform: scale(1,1)
.tap-leave-active
  animation: none
  background-color: #00e676
  transition: all .3s ease-in-out
.tap-leave-to
  opacity: 0
  transform: scale(1.5,1.5)

.laser-leave
  opacity: 1
  transform: scale(1,1)
.laser-leave-active
  animation: none
  background-color: #ff1744
  transition: all .3s ease-in-out
.laser-leave-to
  opacity: 0
  transform: scale(1.1,1.1)
</style>

<script>
  import EventBus from '@/common/utils/EventBus'
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      top: {
        type: Number, // 10 - 90
        default: 10
      },
      left: {
        type: Number, // 10 - 90
        default: 10
      }
    },
    data () {
      return {
        show: true,
        destroyedBy: 'tap', // ['tap', 'laser']
        diameter: 20, // 直径
        events: {}
      }
    },
    computed: {
      transitionName () {
        return this.destroyedBy === 'tap' ? 'tap' : 'laser'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.events.laserX = EventBus.$once('laserX' + this.left, () => {
          this.onLaserTouch()
        })
        this.events.laserY = EventBus.$on('laserY' + this.top, () => {
          this.onLaserTouch()
        })
      },
      onLaserTouch () {
        if (this.show) {
          this.destroyedBy = 'laser'
          this.show = false
          this.destroy()
        }
      },
      tap () {
        if (this.show) {
          this.destroyedBy = 'tap'
          this.show = false
          this.destroy()
        }
      },
      destroy () {
        Object.keys(this.events).forEach(event => {
          EventBus.$off(this.events[event])
        })
        this.$nextTick(() => {
          this.$emit('destroy', this.id)
        })
      }
    }
  }
</script>
