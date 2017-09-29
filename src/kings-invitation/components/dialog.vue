<template lang="jade">
  div.dialog
    div.dialog-content
      div.dialog-bg
      p {{displayedText}}
    span.next-hint(v-show="displayCompleted") 点击继续
</template>

<style lang="stylus" scoped>
  .dialog
    position: fixed
    left: 10%
    bottom: 40px
    width: 800px
    height: 170px
    padding: 20px
    border: 3px solid rgba(50,143,255,.8)
    border-radius: 10px
    text-align: left
    font-size: 24px
    line-height: 36px
    box-sizing: border-box
    p
      margin: 0
  
  .dialog-bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(50,143,255,.5)
    filter: blur(.8)
    z-index: -1

  .dialog-content
    overflow: hidden
    color: #fff

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
