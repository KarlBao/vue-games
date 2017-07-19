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
  <popup-modal :show="showModal" @close="close" @confirm="confirm">
    <common-input v-model="localName" :width="250" :height="40"></common-input>
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
      const obj = localStorage.getItem(localStorageKey) ? localStorage.getItem(localStorageKey) : {}
      console.log(obj)
      obj[this.nameKey] = this.localName
      localStorage.setItem(localStorageKey, obj)
      this.confirmCallback(this.localName)
      this.showModal = false
    }
  }
})

function setName (key = 'default', cb = (name) => {}) {
  showModal()
  modalVM.nameKey = key
  modalVM.confirmCallback = cb
}

function getName (key = 'default') {
  const localName = localStorage.getItem(localStorageKey)
  if (localName) {
    return localName[key]
  } else {
    return undefined
  }
}

function showModal () {
  console.log('show modal')
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
