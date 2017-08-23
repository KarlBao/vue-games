<template lang="jade">
  //- top: laserDirection === 'v' ? 0 : progress+'%', left: laserDirection === 'h' ? 0 : progress+'%'
  //- transitionDuration: 100/speed+'s'
  div.laser(
    :class="[laserDirection === 'v' ? 'vertical' : 'horizontal', start ? 'animating' : '', 'from-'+from]",
    :style="{top: laserDirection === 'v' ? 0 : position+'%', left: laserDirection === 'h' ? 0 : position+'%'}"
  )
</template>

<style lang="stylus" scoped>
.laser
  position: absolute
  background-color: #d50000
  z-index: 1
  transition: all .05s linear
  // transition-property: all
  // transition-timing-function: linear
  &.vertical
    margin-left: -1px
    width: 3px
    height: 100%
  &.horizontal
    margin-top: -1px
    height: 5px
    width: 100%
  // &.from-left
  //   left: 0
  //   &.animating
  //     left: 100%
</style>

<script>
  import EventBus from '@/common/utils/EventBus'
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      from: { // ['top', 'right', 'bottom', 'left']
        type: String,
        default: 'left'
      },
      speed: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        progress: 0,
        event: null,
        timer: null,
        start: false,
        fps: 30, // 动画帧率
        then: 0
      }
    },
    computed: {
      laserDirection () {
        return this.from === 'left' || this.from === 'right' ? 'v' : 'h'
      },
      position () {
        return this.from === 'left' || this.from === 'top' ? this.progress : (100 - this.progress)
      },
      // 每个百分点发送触发事件
      intPosition () {
        return parseInt(this.position)
      }
    },
    watch: {
      intPosition (pos) {
        if (this.laserDirection === 'v') {
          EventBus.$emit('laserX' + this.intPosition)
        }
        if (this.laserDirection === 'h') {
          EventBus.$emit('laserY' + this.intPosition)
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.fps = this.speed > this.fps ? this.speed : this.fps
        // const period = 1000 / this.fps
        // this.timer = setInterval(this.playFrame, period)
        this.then = Date.now()
        this.animate()
        setTimeout(() => {
          this.start = true
        }, 1)
      },
      animate () {
        this.timer = requestAnimationFrame(this.animate)
        const now = Date.now()
        const elapsed = now - this.then
        const fpsInterval = 1000 / this.fps

        if (elapsed > fpsInterval) {
          this.playFrame()
          this.then = now - (elapsed % fpsInterval)
        }
      },
      playFrame () {
        const frameProgress = this.speed / this.fps
        this.progress = this.progress + frameProgress
        if (this.progress > 100) {
          this.destroy()
        }
      },
      destroy () {
        // clearInterval(this.timer)
        cancelAnimationFrame(this.timer)
        this.$emit('destroy', this.id)
      }
    }
  }
</script>
