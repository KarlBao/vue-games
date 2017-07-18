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
  <popup-modal :show="showModal" @close="close" @confirm="confirm">
    <common-input v-model="localName" :width="250" :height="40"></common-input>
  </popup-modal>`,
  data: {
    showModal: false,
    localName: ''
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
      // sn = setNameGenerator(true, this.localName)
      sn.next()
      this.showModal = false
    }
  }
})

let sn = null

// 通过generator做异步调用
function* setNameGenerator (confirm, name) {
  return new Promise((resolve, reject) => {
    if (confirm) {
      localStorage.setItem('localName', name)
      resolve(name)
    } else {
      reject()
    }
  })
}

async function setName () {
  showModal()
  sn = setNameGenerator(true, 'xxx')
  return await sn
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
  set: setName
}

export default methods
