<template lang="jade">
  div.modal.fade(v-show="show || modalShown", tabindex="-1", role="dialog")
    transition(
      name="fade-in-up",
      @before-enter="modalShown = true",
      @after-leave="modalShown = false"
    )
      div.modal-dialog(v-show="show", :class="['modal-' + size]")
        div.modal-content
          div.modal-header(v-if="header")
            span.close.icon-font.icon-cancel(@click="close")
            h4.modal-title {{title}}
          div.modal-body
            slot
          div.modal-footer(v-if="footer")
            common-button.btn(v-if="buttons.cancel !== false", @click.native="close", type="ghost", size="sm") {{buttons.cancel}}
            common-button.btn(v-if="buttons.confirm !== false", @click.native="confirm", size="sm") {{buttons.confirm}}
</template>

<style lang="stylus" scoped>
@import './index.styl'
@import '~@/common/style/transition.styl'

.modal
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: auto
  background-color: $color.backdrop
  z-index: 99

.modal-dialog
  position: relative
  margin: 30px auto
  max-width: 500px
  &.modal-sm
    max-width: 250px
  &.modal-md
    max-width: 500px
  &.modal-lg
    max-width: 800px

.modal-content
  border: 1px solid rgba(0,0,0,.2)
  border-radius: 4px
  background-color: #fff

.modal-header,
.modal-body,
.modal-footer
  padding: 15px

.modal-header
  position: relative
  border-bottom: 1px solid $color.cuttingLine
  font-size: 18px
  .modal-title
    margin: 0
    text-align: left
    font-weight: normal
  .close
    position: absolute
    top: 15px
    right: 15px
    color: #666
    font-size: 16px
    cursor: pointer

.modal-footer
  border-top: 1px solid $color.cuttingLine
  text-align: right
  .btn
    margin-left: 15px
</style>

<script>
  import CommonButton from '@/common/components/common-button'

  export default {
    props: {
      // 显示、隐藏模态框
      show: {
        type: Boolean,
        default: false
      },
      // 模态框尺寸：['sm','md','lg']
      size: {
        type: String,
        default: 'md'
      },
      // 是否显示header
      header: {
        type: Boolean,
        default: true
      },
      // 模态框标题，只有header为true时有效
      title: {
        type: String,
        default: ''
      },
      // 是否显示footer
      footer: {
        type: Boolean,
        default: true
      },
      // 按钮只有footer为true时有效
      buttons: {
        type: Object,
        default () {
          return {
            confirm: '确认', // String | false
            cancel: '取消' // String | false
          }
        }
      }
    },
    data () {
      return {
        modalShown: false
      }
    },
    components: {
      CommonButton
    },
    methods: {
      showModal () {
      },
      close () {
        this.$emit('cancel')
      },
      confirm () {
        this.$emit('confirm', this)
      }
    }
  }
</script>
