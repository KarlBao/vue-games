<template lang="jade">
  div.roulette-ctnr
    div.roulette-panel
      div.roulette(:style="{transform: 'rotate('+angle+'deg)'}")
      div.pointer
      mu-raised-button.btn(v-if="curStatus === STATUS.READY", label="转动", secondary, @click.native="play")
      mu-raised-button.btn(v-if="curStatus === STATUS.PLAYING", label="停下", secondary, @click.native="stop")
      mu-raised-button.btn(v-if="curStatus === STATUS.DONE", label="下一步", secondary, @click.native="complete")
</template>

<style lang="stylus" scoped>
  .roulette-ctnr
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,.2)
    text-align: center
    z-index: 999
    &:before
      content: ''
      display: inline-block
      vertical-align: middle
      width: .25em
      height: 100%
      margin-left: -.25em
  .roulette-panel
    display: inline-block
    vertical-align: middle
  .roulette
    width: 150px
    height: 150px
    margin-bottom: 20px
    background-color: #888
  .pointer
    position: absolute
    top: 74px
    left: 75px
    width: 20px
    height: 3px
    background-color: #fff
</style>

<script>
  import areas from './areas'
  export default {
    data () {
      const STATUS = {
        READY: 0,
        PLAYING: 1,
        DONE: 2
      }
      return {
        angle: 0,
        angularSpeed: 720,
        fps: 60,
        playTimer: null,
        isPlaying: false,
        STATUS: STATUS,
        curStatus: STATUS.READY
      }
    },
    methods: {
      play () {
        this.curStatus = this.STATUS.PLAYING
        const framePeriod = 1000 / this.fps
        this.playTimer = setInterval(this.playFrame, framePeriod)
      },
      playFrame () {
        const angularPerFrame = this.angularSpeed / this.fps
        this.angle += angularPerFrame
      },
      stop () {
        clearInterval(this.playTimer)
        this.curStatus = this.STATUS.DONE
      },
      complete () {
        this.$emit('complete', this.getArea())
      },
      getArea () {
        const areaStartAngle = this.getAreaStartAngle()
        return areas[areaStartAngle]
      },
      getAreaStartAngle () {
        const matchArr = Object.keys(areas)
        const angle = this.angle % 360
        const matchedAngles = matchArr.filter(ele => ele <= angle)
        return matchedAngles[matchedAngles.length - 1]
      }
    }
  }
</script>
