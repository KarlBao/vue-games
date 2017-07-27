import request from '@/common/utils/request'

const GET_ROOMS = '/socket/rooms'
const CREATE_ROOM = '/socket/createRoom'

const services = {
  getRooms (params = {}) {
    return request.get(GET_ROOMS, params)
  },
  createRoom (params = {}) {
    return request.post(CREATE_ROOM, params)
  }
}

export default services
