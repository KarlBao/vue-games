<template lang="jade">
  transition(name="blast")
    div.blast(v-if="isBlasting", :style="{top: blastTop+'%', height: diameter+'%'}")
</template>

<style lang="stylus" scoped>
  .blast
    position: fixed
    left: 0
    width: 100%
    background-color: #ff1744
    opacity: .75
    background: #ff7043 /* Old browsers */
    background: -moz-linear-gradient(top,#ff7043 0%,#e64a19 51%,#ff7043 100%) /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #ff7043 0%,#e64a19 51%,#ff7043 100%) /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #ff7043 0%,#e64a19 51%,#ff7043 100%) /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: blur(2px)
    transform: scale(1, 1)

  @keyframes blast-in
    0%
      transform: scale(1, .1)
      left: -100%
    10%
      left: 0
    95%
      transform: scale(1, .12)
      opacity: 1
    100%
      transform: scale(1, 1)

  .blast-enter
    transform: scale(1, .1)
    left: -100%
  .blast-enter-active
    animation: blast-in .7s
  
  .blast-leave-to
    transform: scale(1, .1)
  .blast-leave-active
    transition: all .2s
</style>

<script>
  import EventBus from '@/common/utils/EventBus'
  import powerupMixin from './mixin'
  export default {
    mixins: [powerupMixin],
    data () {
      return {
        isLocked: false,
        isBlasting: false,
        blastTop: 0,
        diameter: 20
      }
    },
    beforeDestroy () {
      this.finishAnim()
    },
    methods: {
      usePowerup () {
        if (this.isLocked || this.isBlasting) { return false }
        this.isLocked = true
        document.addEventListener('mousedown', this.activatePowerup)
        this.$store.dispatch('setCursor', 'crosshair')
      },
      activatePowerup (e) {
        document.removeEventListener('mousedown', this.activatePowerup)
        this.$store.dispatch('setCursor', 'default')
        this.blastTop = (this.getMousePosition(e) - (this.diameter / 2))
        this.isBlasting = true
        setTimeout(this.ruinPoints, 800)
      },
      getMousePosition (e) {
        const topOffset = e.clientY
        const windowHeight = window.innerHeight
        return Math.floor((topOffset / windowHeight) * 100)
      },
      ruinPoints () {
        const minY = Math.floor(this.blastTop)
        const maxY = Math.ceil(this.blastTop + this.diameter)
        EventBus.$emit('hitPoint', true, {y: [minY, maxY]})
        setTimeout(this.finishAnim, 2000)
      },
      finishAnim () {
        this.isBlasting = false
        this.isLocked = false
      }
    }
  }
</script>
