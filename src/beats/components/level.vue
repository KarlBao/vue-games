<template lang="jade">
  div.level
    laser(
      v-for="laser in activeLasers",
      :key="laser.id",
      :id="laser.id",
      :from="laser.from",
      :speed="laser.speed",
      @destroy="removeLaser"
    )
    beat-point(
      v-for="point in activePoints",
      :key="point.id",
      :id="point.id",
      :left="point.left",
      :top="point.top",
      @destroy="removePoint"
    )
</template>

<style lang="stylus" scoped>
.level
  position: fixed
  width: 100%
  height: 100%
</style>

<script>
import Laser from './laser'
import BeatPoint from './beat-point'

export default {
  name: 'level',
  props: {
    levelNum: {
      type: Number,
      required: true
    },
    lasers: {
      type: Array,
      default: []
    },
    numOfPoints: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      laserId: 1,
      pointId: 1,
      activeLasers: []
    }
  },
  computed: {
    activePoints () {
      return this.$store.getters.getActivePoints
    }
  },
  watch: {
    levelNum (val) {
      this.initLevel()
    }
  },
  components: {
    Laser,
    BeatPoint
  },
  mounted () {
    this.initLevel()
  },
  methods: {
    initLevel () {
      this.activeLasers = []
      this.$store.dispatch('clearPoints')
      this.addPoints()
      this.addLasers()
    },
    addLasers () {
      let randomDirections = ['left', 'right', 'top', 'bottom']

      const getRandomDirection = (directions = ['left', 'right', 'top', 'bottom']) => {
        let index = Math.floor(Math.random() * directions.length)
        return directions[index]
      }

      this.lasers.forEach(laser => {
        if (laser.from === 'random') {
          laser.from = getRandomDirection(randomDirections)
          const index = randomDirections.indexOf(laser.from)
          if (index > -1) {
            randomDirections = randomDirections.splice(1, index)
          }
        }
        this.activeLasers.push({
          id: this.laserId++,
          speed: laser.speed,
          from: laser.from
        })
      })
    },
    removeLaser (id) {
      this.activeLasers = this.activeLasers.filter(laser => laser.id !== id)
    },
    addPoints () {
      for (let i = 0; i < this.numOfPoints; i++) {
        const top = Math.ceil(Math.random() * 80) + 10
        const left = Math.ceil(Math.random() * 80) + 10
        const point = {
          id: this.pointId++,
          top: top,
          left: left
        }
        this.$store.dispatch('addPoint', point)
      }
    },
    removePoint (id) {
      this.$store.dispatch('removePoint', id)
      if (this.activePoints.length === 0) {
        setTimeout(() => {
          this.finishLevel()
        }, 600)
      }
    },
    finishLevel () {
      this.$emit('complete')
    }
  }
}
</script>
