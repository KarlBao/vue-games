<template lang="jade">
  div.modal.fade(id="modal", tabindex="-1", role="dialog")
    div.modal-dialog(:class="['modal-' + size]")
      div.modal-content
        div.modal-header(v-if="header")
          button.close(@click.native="close")
            span
          h4.modal-title {{title}}
        div.modal-body
          slot
        div.modal-footer(v-if="footer")
          common-button(v-if="buttons.cancel !== false", @click.native="close") {{buttons.cancel}}
          common-button(v-if="buttons.confirm !== false", @click.native="confirm") {{buttons.confirm}}
</template>

<script>
  import $ from 'jquery'
  import 'bootstrap'
  import CommonButton from '@/common/components/common-button'

  export default {
    props: {
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
      },
      /**
       * Modal激活可选参数
       * @see http://v3.bootcss.com/javascript/#modals-options
       */
      options: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      CommonButton
    },
    mounted () {
      // console.log($('#modal'))
      this.showModal()
    },
    methods: {
      showModal () {
        $('#modal').modal(this.options)
      },
      close () {
        $(this.$el).modal('hide')
        this.$emit('close')
      },
      confirm () {
        this.$emit('confirm', this)
      }
    }
  }
</script>
