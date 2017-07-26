/**
 * 获取临时用户名
 * -----
 * 临时用户名存在localStorage里
 */
import Vue from 'vue'
import PopupModal from '@/common/components/popup-modal'
import CommonInput from '@/common/components/common-input'

const localStorageKey = 'localName' // 所有本地域名都存在此对象下

const modalVM = new Vue({
  template: `
  <popup-modal :show="showModal" title="设置昵称" @cancel="close" @confirm="confirm">
    <common-input v-model="localName" :width="400" :height="25" placeholder="输入昵称..."></common-input>
  </popup-modal>`,
  data: {
    showModal: false,
    localName: '',
    nameKey: 'default',
    confirmCallback: (name) => {}
  },
  components: {
    PopupModal,
    CommonInput
  },
  mounted () {
    this.showModal = false
  },
  methods: {
    close () {
      this.showModal = false
    },
    confirm () {
      if (this.localName === '') {
        return
      }
      const obj = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : {}
      obj[this.nameKey] = this.localName
      localStorage.setItem(localStorageKey, JSON.stringify(obj))
      this.confirmCallback(this.localName)
      this.showModal = false
    }
  }
})

function setName (key = 'default', cb = (name) => {}) {
  showModal()
  modalVM.nameKey = key
  modalVM.confirmCallback = cb
  modalVM.localName = getName(key)
}

function getName (key = 'default') {
  const localName = JSON.parse(localStorage.getItem(localStorageKey))
  if (localName) {
    return localName[key]
  } else {
    return undefined
  }
}

function showModal () {
  // 如果还没挂载则手动挂载到body下
  if (!modalVM._isMounted) {
    const mountDiv = document.createElement('div')
    document.body.appendChild(mountDiv)
    modalVM.$mount(mountDiv)
  }
  modalVM.showModal = true
}

const methods = {
  set: setName,
  get: getName
}

export default methods
