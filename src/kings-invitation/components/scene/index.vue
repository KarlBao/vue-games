<template lang="jade">
  div.scene(@click="handleSceneClick")
    div.background(:style="{backgroundImage: 'url(' + bgUrl + ')'}")
    div.character(:style="{backgroundImage: charUrl}")
    roulette(v-if="rouletteShown", @complete="handleArea")
    dialog-box(
      :text="dialog.text",
      :speed="dialog.speed",
      :speaker="dialog.speaker",
      :has-next="hasNextDialog",
      @complete="dialogPlaying = false",
      @start="dialogPlaying = true"
    )
</template>

<style lang="stylus" scoped>
  .scene
    position: fixed
    top: 50%
    left: 50%
    width: 800px
    height: 600px
    margin-left: -400px
    margin-top: -300px
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>

<script>
  import DialogBox from './../dialog'
  import Roulette from './../roulette'
  import scenes from './scenes'
  export default {
    props: {
      index: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        dialogIndex: 0,
        dialogPlaying: true,
        rouletteShown: false
      }
    },
    computed: {
      scene () {
        return scenes[this.index]
      },
      dialog () {
        return this.scene.dialogs[this.dialogIndex]
      },
      hasNextDialog () {
        return this.scene.dialogs.length > this.dialogIndex + 1
      },
      bgUrl () {
        return this.scene.background
      },
      charUrl () {
        return this.scene.character
      }
    },
    watch: {
      scene () {
        this.initScene()
      }
    },
    components: {
      DialogBox,
      Roulette
    },
    methods: {
      initScene () {
        this.dialogIndex = 0
        this.dialogPlaying = true
        this.rouletteShown = false
      },
      handleSceneClick () {
        if (!this.dialogPlaying) {
          this.handleDialog()
        }
      },
      handleDialog () {
        const dialogType = this.dialog.type
        switch (dialogType) {
          case 'normal':
            this.showNextDialog()
            break
          case 'roulette':
            this.showRoulette()
            break
          case 'gameover':
            this.$emit('gameover')
            break
        }
      },
      showNextDialog () {
        if (this.hasNextDialog) {
          this.dialogIndex++
        }
      },
      showRoulette () {
        this.rouletteShown = true
      },
      hideRoulette () {
        this.rouletteShown = false
      },
      handleArea (area) {
        this.hideRoulette()
        const nextScene = this.dialog.handleRoulette(area)
        this.changeScene(nextScene)
      },
      changeScene (index) {
        if (index === undefined || index === false) {
          this.showNextDialog()
        } else {
          this.$store.dispatch('showScene', index)
        }
      }
    }
  }
</script>
