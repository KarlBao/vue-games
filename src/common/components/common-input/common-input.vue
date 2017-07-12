<template lang="jade">
  div.common-input-ctnr(:class="{focused: isFocused}")
    input.common-input(
      ref="input",
      :type="type", :model="model", :maxlength="maxlength",
      :style="{width: width + 'px', height: height + 'px', 'line-height': height + 'px'}",
      @click="click", @change="change", @focus="focusFunc", @blur="blurFunc", @keyup="keyup", @keydown="keydown"
    )
    span.placeholder(:class="{out: isFocused}", :style="{height: height + 'px', 'line-height': height + 'px'}") {{placeholder}}
</template>

<style lang="stylus" scoped>
@import '~@/common/style/color.styl'

.common-input-ctnr
  display: inline-block
  position: relative
  padding: 3px 8px
  border-bottom: 1px solid $commonColor.blue
  overflow: hidden
  &.focused
    .placeholder
      bottom: 100%
      opacity: 0
.common-input
  padding: 0
  border: none
  appearance: none
  color: #666
  &:focus, &:active
    outline: none  
.placeholder
  display: inline-block
  position: absolute
  bottom: 3px
  left: 8px
  color: #e3e3e3
  opacity: 1
  transition: all .2s
</style>

<script>
  export default {
    props: {
      model: {
        'default': ''
      },

      type: {
        type: String,
        'default': 'text'
      },

      placeholder: {
        type: String,
        'default': 'xxx'
      },

      maxlength: {
        type: Number
      },

      width: {
        type: Number,
        'default': 100
      },

      height: {
        type: Number,
        default: 24
      },

      click: {
        type: Function,
        'default': noop
      },

      focus: {
        type: Function,
        'default': noop
      },

      change: {
        type: Function,
        'default': noop
      },

      blur: {
        type: Function,
        'default': noop
      },

      keyup: {
        type: Function,
        'default': noop
      },

      keydown: {
        type: Function,
        'default': noop
      }
    },

    data () {
      return {
        isFocused: false
      }
    },

    computed: {
    },

    methods: {
      focusFunc () {
        this.focus()
        this.isFocused = true
      },
      blurFunc () {
        this.blur()
        this.isFocused = false
      }
    }
  }

  function noop () {}
</script>

