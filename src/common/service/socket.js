import io from 'socket.io-client'

const host = 'http://localhost:3000'
let socket = null

// 开启一个socket
export function startSocket (namespace) {
  if (socket === null) {
    socket = io(`${host}/${namespace}`)
  }
}

// 必须在socket开启后使用
export { socket }
