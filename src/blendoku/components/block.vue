<template lang="jade">
  div.block(:class="{active: active}", @click="select")
    div.block-content(:style="{backgroundColor: empty ? 'none' : rgbStyle}")
      span.placeholder(:class="[group==='resultList' ? 'border':'dot']")
</template>

<style lang="stylus" scoped>
  .block
    position: relative
    width: 120px
    height: 120px
    padding: 10px
    border-radius: 5px
    float: left
    cursor: pointer
    &.active
      background-color: #fff
  
  .block-content
    position: relative
    width: 100%
    height: 100%
    border-radius: 5px

  .placeholder
    position: absolute
    top: 50%
    left: 50%
    display: inline-block
    border-radius: 5px
    z-index: -1
    &.dot
      width: 20px
      height: 20px
      margin-top: -10px
      margin-left: -10px
      background-color: #aaa
    &.border
      top: 0
      left: 0
      width: 100px
      height: 100px
      border: 5px solid #aaa
</style>

<script>
import EventBus from '@/common/utils/EventBus'
export default {
  name: 'block',
  props: {
    group: {
      type: String,
      default: 'global'
    },
    // 区块坐标
    coord: {
      required: true,
      type: Object,
      default: {
        x: 0,
        y: 0
      }
    },
    // RGB值
    rgb: {
      type: String,
      default: ''
    },
    // 选中时触发回调
    onSelect: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      active: false // 区块处于选中状态
    }
  },

  computed: {
    rgbStyle () {
      return `rgb(${this.rgb})`
    },
    empty () {
      return this.rgb === ''
    },
    activeBlocks () {
      return this.$store.state.activeBlocks
    }
  },

  mounted () {
    EventBus.$on('clearActive', () => {
      if (this.active) {
        console.log(`clear: ${this.coord.x}`)
      }
      this.active = false
    })
  },

  beforeDestroy () {
    EventBus.$off('clearActive')
  },

  methods: {
    select () {
      if (this.activeBlocks.length === 0 && this.empty) {
        return
      }
      this.$store.commit('addActiveBlock', {
        rgb: this.rgb,
        coord: this.coord,
        group: this.group
      })
      this.active = !this.active
      // this.onSelect(this.coord)
    }
  }
}
</script>

