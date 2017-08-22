<template lang="jade">
  div.level
    laser(
      v-for="laser in lasers",
      :key="laser.id",
      :id="laser.id",
      :from="laser.from",
      @destroy="removeLaser"
    )
    beat-point(
      v-for="point in points",
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
    numOfLasers: {
      type: Number,
      default: 1
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
      lasers: [],
      points: []
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
      this.lasers = []
      this.points = []
      for (let i = 0; i < this.numOfPoints; i++) {
        this.addPoint()
      }
      for (let i = 0; i < this.numOfLasers; i++) {
        this.addLaser()
      }
    },
    addLaser () {
      this.lasers.push({
        id: this.laserId++,
        speed: 20,
        from: 'left'
      })
    },
    removeLaser (id) {
      this.lasers = this.lasers.filter(laser => laser.id !== id)
      if (this.lasers.length === 0) {
        // finish level
        this.finishLevel()
      }
    },
    addPoint () {
      const top = Math.ceil(Math.random() * 80) + 10
      const left = Math.ceil(Math.random() * 80) + 10
      this.points.push({
        id: this.pointId++,
        top: top,
        left: left
      })
    },
    removePoint (id) {
      this.points = this.points.filter(point => point.id !== id)
    },
    finishLevel () {
      this.$emit('complete')
    }
  }
}
</script>
