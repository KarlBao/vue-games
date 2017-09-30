<template lang="jade">
  div.dialog
    div.dialog-content
      div.dialog-bg
      p {{displayedText}}
    span.speaker(v-show="speaker !== ''") {{speaker}}
    span.next-hint(v-show="displayCompleted") 点击继续
</template>

<style lang="stylus" scoped>
  $borderRGB = rgba(50,143,255,.8)
  $contentRGB = rgba(50,143,255,.5)
  .dialog
    position: absolute
    left: 50px
    bottom: 40px
    width: 700px
    height: 170px
    padding: 20px
    border: 3px solid $borderRGB
    border-radius: 10px
    text-align: left
    font-size: 24px
    line-height: 36px
    box-sizing: border-box
    z-index: 10
    p
      margin: 0
  
  .dialog-bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: $contentRGB
    filter: blur(5px)
    z-index: -1

  .dialog-content
    overflow: hidden
    color: #fff

  .speaker
    position: absolute
    top: -50px
    left: 0
    min-width: 60px
    height: 40px
    padding: 0 20px
    border: 2px solid $borderRGB
    border-radius: 5px
    line-height: 40px
    background-color: $contentRGB
    color: #fff
    text-align: center
  .next-hint
    font-size: 16px
    color: #fff
    position: absolute
    right: 20px
    bottom: 0
</style>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      speed: {
        type: Number,
        default: 0
      },
      speaker: {
        type: String,
        default: ''
      },
      hasNext: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        displayedText: '',
        displayCompleted: false,
        playTimer: null,
        words: []
      }
    },
    watch: {
      text () {
        this.playDialog()
      },
      displayedText (text) {
        if (text === this.text) {
          // all displayed
          this.stopPlay()
        }
      }
    },
    mounted () {
      this.playDialog()
    },
    methods: {
      init () {
        this.displayedText = ''
        this.displayCompleted = false
        this.playTimer = null
        this.words = this.text.split('')
        this.$emit('start')
      },
      playDialog () {
        this.init()
        if (this.speed === 0) {
          this.playDialogImmediately()
        } else {
          this.playDialogProgressively()
        }
      },
      playDialogImmediately () {
        this.displayedText = this.text
      },
      playDialogProgressively () {
        this.playTimer = setInterval(this.appendWord, this.speed)
      },
      appendWord () {
        const displayedTextLength = this.displayedText.length
        if (displayedTextLength < this.words.length) {
          const textToAppend = this.words[displayedTextLength]
          this.displayedText = this.displayedText + textToAppend
        }
      },
      stopPlay () {
        clearInterval(this.playTimer)
        this.displayCompleted = true
        this.$emit('complete')
      }
    }
  }
</script>
