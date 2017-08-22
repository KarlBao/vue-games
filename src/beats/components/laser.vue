<template lang="jade">
  //- top: laserDirection === 'v' ? 0 : progress+'%', left: laserDirection === 'h' ? 0 : progress+'%'
  //- transitionDuration: 100/speed+'s'
  div.laser(
    :class="[laserDirection === 'v' ? 'vertical' : 'horizontal', start ? 'animating' : '', 'from-'+from]",
    :style="{top: laserDirection === 'v' ? 0 : progress+'%', left: laserDirection === 'h' ? 0 : progress+'%'}"
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
        start: false
      }
    },
    computed: {
      laserDirection () {
        return this.from === 'left' || this.from === 'right' ? 'v' : 'h'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        const period = 1000 / this.speed
        this.timer = setInterval(this.playFrame, period)
        setTimeout(() => {
          this.start = true
        }, 1)
      },
      playFrame () {
        if (this.laserDirection === 'v') {
          EventBus.$emit('laserX' + this.progress)
        }
        if (this.laserDirection === 'h') {
          EventBus.$emit('laserY' + this.progress)
        }
        this.progress++
        if (this.progress > 100) {
          this.destroy()
        }
      },
      destroy () {
        clearInterval(this.timer)
        this.$emit('destroy', this.id)
      }
    }
  }
</script>
