/**
 * 开启和服务器的socket连接
 *
 * 安装：
 * --------
 * 引入后， 使用 Vue.use(socket, {namespace: 'xxx'}) 全局安装
 *
 *
 * 使用：
 * --------
 * 在组件中通过 this.$socket 调用
 */
import io from 'socket.io-client'

export default {
  install (Vue, opts = {}) {
    const host = process.env.NODE_ENV === 'production' ? 'http://api.karlbao.com' : 'http://localhost:3000'

    const defaultOpts = {
      namespace: ''
    }

    const options = Object.assign(defaultOpts, opts)

    const socket = io(`${host}/${options.namespace}`)

    Vue.prototype.$socket = socket
  }
}
