<template lang="jade">
  div.hall
    div.header
      h2.f-left.title 当前房间：
      common-button.f-right.create-btn(@click.native="createRoom") 新的房间
    
    div.f-left(v-if="rooms.length === 0")
      p 目前没有可以进入的房间...新建一个吧...
      
    div.room-list.f-left(v-else)
      router-link.dp-block.room-link(v-for="room in rooms", :key="room", :to="'/room/' + room") {{room}}号房间
</template>

<style lang="stylus" scoped>
.header
  height: 80px
  line-height: 80px
  overflow: hidden

.create-btn
  margin-right: 60px
  float: right

.room-link
  margin-top: 20px
</style>

<script>
import CommonButton from '@/common/components/common-button'
import services from '@/common/service/srv.rooms'

export default {
  data () {
    return {
      rooms: []
    }
  },
  components: {
    CommonButton
  },
  mounted () {
    this.getRooms()
  },
  methods: {
    getRooms () {
      services.getRooms({channel: 'gomoku'})
        .then(res => {
          this.rooms = res.data
        })
    },
    createRoom () {
      services.createRoom({channel: 'gomoku'})
        .then(res => {
          const roomId = res.data.roomId
          this.$router.push({path: `/room/${roomId}`})
        })
    }
  }
}
</script>
