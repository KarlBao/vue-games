<template lang="jade">
  div.scene(@click="handleSceneClick")
    div.background(:style="{backgroundImage: bgUrl}")
    div.character(:style="{backgroundImage: charUrl}")
    roulette(v-if="rouletteShown", @complete="handleArea")
    dialog-box(
      :text="dialog.text",
      :speed="dialog.speed",
      :has-next="hasNextDialog",
      @complete="dialogPlaying = false",
      @start="dialogPlaying = true"
    )
</template>

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
        if (this.dialogPlaying) {
          return
        }

        if (this.hasNextDialog) {
          this.showNextDialog()
        } else {
          this.showRoulette()
        }
      },
      showNextDialog () {
        this.dialogIndex++
      },
      showRoulette () {
        this.rouletteShown = true
      },
      hideRoulette () {
        this.rouletteShown = false
      },
      handleArea (area) {
        this.hideRoulette()
        console.log(area.type)
        if (area.type === 0) {
          this.$store.dispatch('showPrevScene')
        } else {
          this.$store.dispatch('showNextScene')
        }
      }
    }
  }
</script>
