import Vue from 'vue'
import VueRouter from 'vue-router'
import GomokuRoom from './../components/room'
import RoomHall from './../components/room-hall'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: RoomHall
  },
  {
    path: '/room/:id',
    component: GomokuRoom
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
