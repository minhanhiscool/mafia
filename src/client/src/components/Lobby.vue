<script setup>
  import {useRouter} from 'vue-router'
  import {ref, onMounted, onBeforeUnmount} from 'vue'
  import {socket} from '../socket'
  import {getPlayerID} from '../player.js'

  const router = useRouter()
  const name = ref('')
  const roomCode = ref('')
  const playerID = getPlayerID()

  function createRoom() {
    socket.emit('createRoom', {name: name.value, playerID: playerID})
  }

  function joinRoom() {
    if (roomCode.value.length === 0) {
      alert('Please enter a room code')
      return
    }
    socket.emit('joinRoom', {code: roomCode.value, name: name.value, playerID: playerID});
  }

  function handleCreated(data) {
    console.log(data)

    router.push({name: 'Admin', params: {roomCode: data.roomCode}})
  }
  function handleJoined(data) {
    if (!data.ok){
      if (data.warning){
        const confirm = window.confirm(
          `Your previous name was "${data.oldName}". Use "${data.newName}" instead?`
        )

        if (confirm) {
          socket.emit('confirmNameChange', {code: roomCode.value , playerID: playerID, name: data.newName})
        }
        else{
          socket.emit('confirmNameChange', {code: roomCode.value , playerID: playerID, name: data.oldName})
        }
        return;
      }
      else{
        alert(data.error)
        return;
      }
    }
    console.log(data)
    router.push({name: data.role == 'admin' ? 'Admin' : 'Player', params: {roomCode: roomCode.value}})
  }

  onMounted(() => {
    socket.on('roomCreated', handleCreated);
    socket.on('roomJoined', handleJoined);
    socket.on('joinConfirmed', handleJoined);
  })

  onBeforeUnmount(() => {
    socket.off('roomCreated', handleCreated);
    socket.off('roomJoined', handleJoined);
    socket.off('joinConfirmed', handleJoined);
  })
</script>

<template>
  <div class="min-h-screen bg-[#eed49f] flex flex-col items-center justify-center px-4">

    <!-- Title Card -->
    <div class="bg-red-400 shadow-lg rounded-2xl px-10 py-6 mb-10 text-center">
      <h1 class="text-5xl font-extrabold text-white tracking-wide drop-shadow">
        Mafia!
      </h1>
      <p class="text-white/80 mt-1 text-sm">Create or join a room to start</p>
    </div>

    <!-- Input Card -->
    <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-md space-y-5">

      <!-- Name -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Your Name
        </label>
        <input
          v-model="name"
          placeholder="Enter your name"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <hr class="border-gray-300" />

      <!-- Create Room -->
      <button
        @click="createRoom"
        class="w-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl hover:-translate-y-1 text-white font-bold py-2 rounded-lg transition cursor-pointer"
      >
        Create Room
      </button>

      <!-- Join Room -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">
          Room Code
        </label>
        <input
          v-model="roomCode"
          placeholder="Enter room code"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <button
        @click="joinRoom"
        class="w-full bg-gray-800 hover:bg-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-1 text-white font-bold py-2 rounded-lg transition cursor-pointer"
      >
        Join Room
      </button>

    </div>
  </div>
</template>
