<template lang="jade">
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
  &.vertical
    margin-left: -1px
    width: 3px
    height: 100%
  &.horizontal
    margin-top: -1px
    height: 5px
    width: 100%
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
        animId: null,
        start: false,
        fps: 30, // 动画帧率
        then: 0,
        speedRate: 1 // 速度倍率
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
      },
      frameInterval () {
        return 1000 / this.fps
      }
    },
    watch: {
      intPosition (pos) {
        if (this.laserDirection === 'v') {
          EventBus.$emit('hitPointX' + this.intPosition)
        }
        if (this.laserDirection === 'h') {
          EventBus.$emit('hitPointY' + this.intPosition)
        }
      }
    },
    mounted () {
      this.init()
      this.registerEvents()
    },
    beforeDestroy () {
      EventBus.$off('changeLaserSpeedRate', this.changeSpeedRate)
    },
    methods: {
      init () {
        this.fps = this.speed > this.fps ? this.speed : this.fps
        this.then = Date.now()
        this.animate()
        setTimeout(() => {
          this.start = true
        }, 1)
      },
      registerEvents () {
        // 改变激光移动速率，负数反向移动
        // 当id !== null 时，只对特定id的激光起作用
        // 否则对所有起作用
        EventBus.$on('changeLaserSpeedRate', this.changeSpeedRate)
      },
      changeSpeedRate (speedRate, id = null) {
        if (id !== null && id !== this.id) { return }
        this.speedRate = speedRate
      },
      animate () {
        this.animId = requestAnimationFrame(this.animate)
        const now = Date.now()
        const elapsed = now - this.then

        if (elapsed > this.frameInterval) {
          this.playFrame()
          this.then = now - (elapsed % this.frameInterval)
        }
      },
      playFrame () {
        const frameProgress = this.speed * this.speedRate / this.fps
        this.progress = this.progress + frameProgress > 0 ? (this.progress + frameProgress) : 0
        if (this.progress > 100) {
          this.destroy()
        }
      },
      destroy () {
        cancelAnimationFrame(this.animId)
        this.$emit('destroy', this.id)
      }
    }
  }
</script>
