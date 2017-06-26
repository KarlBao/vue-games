<template lang="jade">
  div.block-list
    color-block(v-for="block in list", :key="block.key", :rgb="block.rgb", :coord="block.coord", :group="group")
</template>

<style lang="stylus" scoped>
  .block-list
    overflow: hidden
</style>

<script>
  import ColorBlock from './block'
  export default {
    props: {
      group: {
        default: 'global'
      },
      blocks: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        list: []
      }
    },
    watch: {
      blocks () {
        this.setList()
      }
    },
    components: {
      ColorBlock
    },
    mounted () {
      this.setList()
    },
    methods: {
      setList () {
        this.list = []
        this.blocks.forEach((rgb, index) => {
          const block = {
            coord: {
              x: index,
              y: 0
            },
            rgb: rgb,
            key: rgb + index
          }
          this.list.push(block)
        })
      }
    }
  }
</script>
