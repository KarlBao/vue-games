<template lang="jade">
  div.grid(@click="putChess")
    span.guideline(:class="gridClass")
    span.chess(:style="{backgroundColor: color}", :class="{'allowed': allowed}")
    slot(name="chess")
</template>

<style lang="stylus">
.grid
  float: left
  position: relative
  width: 50px
  height: 50px
  cursor: pointer

.guideline
  &:before,
  &:after
    content: ''
    position: absolute
    border-style: solid
    border-color: #eee
  &:before
    top: 0
    left: 50%
    width: 50%
    height: 100%
    border-width: 0 0 0 1px
  &:after
    top: 50%
    left: 0
    width: 100%
    height: 50%
    border-width: 1px 0 0 0
  &.corner
    &:before
      height: 50%
    &:after
      width: 50%
    &.left-top
      &:before
        top: 50%
      &:after
        left: 50%
    &.left-bottom
      &:after
        left: 50%
    &.right-top
      &:before
        top: 50%
  &.border
    &.top:before
      top: 50%
      height: 50%
    &.left:after
      left: 50%
      width: 50%
    &.bottom:before
      height: 50%
    &.right:after
      width: 50%
.chess
  position: absolute
  top: 10%
  left: 10%
  width: 80%
  height: 80%
  border-radius: 50%
  &.allowed:hover
    background-color: rgba(0,0,0,.1)
</style>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      coord: {
        type: Object,
        required: true
      },
      onUpdate: {
        type: Function,
        default: () => {}
      },
      type: {
        type: String,
        default: 'normal'
      },
      enabled: {
        type: Boolean,
        default: false
      },
      chess: {
        type: Number, // [null, 1, 2]
        default: null
      },
      totalCols: {
        type: Number,
        default: 0
      },
      totalRows: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
      }
    },

    computed: {
      gridClass () {
        let gridClass = ''
        if (this.coord.x === 0) {
          if (this.coord.y === 0) {
            gridClass = 'corner left-top'
          } else if (this.coord.y === this.totalRows - 1) {
            gridClass = 'corner left-bottom'
          } else {
            gridClass = 'border left'
          }
        } else if (this.coord.x === this.totalCols - 1) {
          if (this.coord.y === 0) {
            gridClass = 'corner right-top'
          } else if (this.coord.y === this.totalRows - 1) {
            gridClass = 'corner right-bottom'
          } else {
            gridClass = 'border right'
          }
        } else if (this.coord.y === 0) {
          gridClass = 'border top'
        } else if (this.coord.y === this.totalRows - 1) {
          gridClass = 'border bottom'
        }

        return gridClass
      },
      color () {
        return this.chess === 1
          ? '#000' : this.chess === 2
          ? '#fff' : 'none'
      },
      myTurn () {
        return this.$store.getters.myTurn
      },
      allowed () {
        return this.myTurn && this.chess === null
      }
    },

    methods: {
      putChess () {
        if (!this.allowed) {
          return
        }

        this.$store.dispatch('putChess', {coord: this.coord})
        this.$socket.emit('putChess', this.coord)
      }
    }
  }
</script>
