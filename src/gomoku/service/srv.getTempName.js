/**
 * 获取临时用户名
 * -----
 * 临时用户名存在localStorage里
 */
import Vue from 'vue'
import PopupModal from '@/common/components/popup-modal'
import CommonInput from '@/common/components/common-input'

const modalVM = new Vue({
  template: `
  <popup-modal :show="showModal" @close="showModal=false" @confirm="setTempName">
    <common-input v-model="tempName" :width="250" :height="40"></common-input>
  </popup-modal>`,
  data: {
    showModal: false,
    tempName: ''
  },
  components: {
    PopupModal,
    CommonInput
  },
  mounted () {
    this.showModal = false
  },
  methods: {
    setTempName () {
      console.log(this.tempName)
      this.showModal = false
    }
  }
})

export default function () {
  // 如果还没挂载则手动挂载到body下
  if (!modalVM._isMounted) {
    const mountDiv = document.createElement('div')
    document.body.appendChild(mountDiv)
    modalVM.$mount(mountDiv)
  }
  modalVM.showModal = true
}
