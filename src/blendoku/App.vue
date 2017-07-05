<template lang="jade">
  div#app
    blockList(:blocks="waitingBlocks", group="waitingList")
    blockList(:blocks="resultBlocks", group="resultList")
</template>

<style lang="stylus">
@import 'index.styl'
body
  background-color: #000
</style>

<script>
import EventBus from '@/common/components/EventBus'
import BlockList from './components/block-list'
export default {
  name: 'app',
  data () {
    return {
      num: 5,
      waitingBlocks: [],
      resultBlocks: [],
      orderedBlocks: []
    }
  },
  components: {
    BlockList
  },
  computed: {
    activeBlocks () {
      return this.$store.state.activeBlocks
    }
  },
  watch: {
    activeBlocks (newVal) {
      if (newVal.length === 2) {
        this.switchBlocks()
      }
    },
    resultBlocks (list) {
      let hasEmpty = list.some(rgb => {
        return rgb === ''
      })

      if (!hasEmpty) {
        this.checkComplete()
      }
    }
  },
  mounted () {
    this.orderedBlocks = this.generateGradientBlocks(this.num)
    this.waitingBlocks = this.shuffle(this.orderedBlocks)
    this.resultBlocks = this.generateEmptyArr(this.num)
  },
  methods: {
    switchBlocks () {
      if (this.activeBlocks[0] !== this.activeBlocks[1]) {
        let groups = {
          waitingList: 'waitingBlocks',
          resultList: 'resultBlocks'
        }
        let list1 = groups[this.activeBlocks[0].group]
        let list2 = groups[this.activeBlocks[1].group]
        this[list1] = replaceEle(this[list1], this.activeBlocks[0].coord.x, this.activeBlocks[1].rgb)
        this[list2] = replaceEle(this[list2], this.activeBlocks[1].coord.x, this.activeBlocks[0].rgb)
      }

      function replaceEle (list, index, replacement) {
        return list.map((ele, i) => {
          if (i === index) {
            return replacement
          } else {
            return ele
          }
        })
      }
      EventBus.$emit('clearActive')
      this.$store.commit('clearActiveBlocks')
    },

    shuffle (arr) {
      let array = arr.slice(0)
      let currentIndex = array.length
      let temporaryValue
      let randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    },

    checkComplete () {
      let completed = true
      let inOrder = this.resultBlocks[0] === this.orderedBlocks[0] // 按顺序排列查找

      console.log(inOrder)
      if (inOrder) {
        // 正序检查
        for (let i = 0; i < this.num; i++) {
          if (this.resultBlocks[i] !== this.orderedBlocks[i]) {
            completed = false
          }
        }
      } else {
        if (this.resultBlocks[0] === this.orderedBlocks[this.num - 1]) {
          // 逆序检查
          for (let i = 0; i < this.num; i++) {
            if (this.resultBlocks[i] !== this.orderedBlocks[this.num - i - 1]) {
              completed = false
            }
          }
        }
      }
      if (completed) {
        console.log('complete')
      }
    },

    generateGradientBlocks (totalBlocks, firstColor, lastColor) {
      firstColor = firstColor || generateRandomColor()
      lastColor = lastColor || generateRandomColor()
      let firstRGB = firstColor.split(',')
      let lastRGB = lastColor.split(',')
      let stepRGB = [] // array
      let generateRGBFloat = firstRGB
      let generateRGBInt = []
      let generateColor = ''
      let blocksArr = []

      function generateBlock () {
        for (var i = 0; i < 3; i++) {
          generateRGBFloat[i] = parseFloat(generateRGBFloat[i]) + parseFloat(stepRGB[i])
          generateRGBInt[i] = Math.floor(generateRGBFloat[i])
        }
        generateColor = generateRGBInt.join(',')
        blocksArr.push(generateColor)
      }

      function generateRandomColor () {
        var randomRGB = []
        for (var i = 0; i < 3; i++) {
          randomRGB[i] = Math.floor(Math.random() * 256)
        }
        return randomRGB.join(',')
      }

      // Generate blocks if totalBlocks are larger than 2
      if (totalBlocks > 2) {
        // Generate first block
        blocksArr.push(firstColor)

        for (let i = 0; i < 3; i++) {
          // stepRGB[i] = (Math.floor(lastRGB[i]/(totalBlocks-1) - firstRGB[i]/(totalBlocks-1)));
          stepRGB[i] = lastRGB[i] / (totalBlocks - 1) - firstRGB[i] / (totalBlocks - 1)
        }

        for (let i = 0; i < totalBlocks - 2; i++) {
          generateBlock()
        }
        // Generate last block
        blocksArr.push(lastColor)
      }

      return blocksArr
    },

    generateEmptyArr (num) {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push('')
      }
      return arr
    }
  }
}
</script>

