<script>
import Lobby from './components/Lobby.vue' 
import Admin from './components/Admin.vue' 
import Player from './components/Player.vue' 
export default { 
  components: { Lobby, Admin, Player }, 

  data() { 
    return { 
      view: 'lobby',
      roomCode: ''
    } 
  },

  methods: {
    handleRoomCreated(data) {
      this.roomCode = data.roomCode
      this.view = data.role
    }
  }
}
</script>

<template>
  <Lobby 
    v-if="view === 'lobby'" 
    @room-created="handleRoomCreated"
    @room-joined="handleRoomCreated"
  />

  <Admin 
    v-if="view === 'admin'" 
    :roomCode="roomCode"
  />

  <Player v-if="view === 'player'" />
</template>
