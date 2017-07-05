import io from 'socket.io-client'

let socket = null

if (socket === null) {
  console.log('null')
  socket = io('http://localhost:3000/gomoku')
}

export default socket
