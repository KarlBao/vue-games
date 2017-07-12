<template lang="jade">
  button.common-button(:class="[type, 'size-'+size]")
    slot
</template>

<style lang="stylus" scoped>
@import '~@/common/style/color.styl'
@import './index.styl'

.common-button
  position: relative
  border: none
  border-image: none
  background: $commonColor.blue
  color: $commonColor.white
  outline: none
  appearance: none
  text-align: center
  overflow: hidden
  cursor: pointer
  &.default
    background-color: $commonColor.blue
    color: $commonColor.white
  &.warning
    background-color: $commonColor.yellow
    color: $commonColor.white
  &.error
    background-color: $commonColor.red
    color: $commonColor.white
  &:before
    content: ''
    position: absolute
    top: 50%
    left: 50%
    border-radius: 50%
    background-color: rgba(255,255,255,.1)
    transform: scale(0,0)
    transition: transform .2s
  &:hover
    &:before
      transform: scale(1,1)
  &.ghost
    background-color: transparent
    color: $commonColor.blue
    border: 1px solid $commonColor.blue
    transition: all .2s
    &:before
      content: none
    &:hover
      background-color: $commonColor.blue
      color: $commonColor.white
  for size in $size
    &.size-{size}
      width: $size[size].width
      height: $size[size].height
      &:before
        $diameter = $size[size].width * 0.8
        width: $diameter
        height: $diameter
        margin-left: $diameter * -0.5
        margin-top: $diameter * -0.5
</style>

<script>
  export default {
    props: {
      // 按钮类型
      type: {
        type: String,
        default: 'default'
      },
      // 按钮尺寸
      size: {
        type: String,
        default: 'normal',
        validator (size) {
          const filter = ['sm', 'normal', 'large']
          return filter.indexOf(size) > -1
        }
      }
    }
  }
</script>
