<script setup>
  import {ref, onMounted, onBeforeUnmount} from 'vue'
  import {socket} from '../socket'

  const emit = defineEmits(['room-created', 'room-joined'])

  const name = ref('')
  const roomCode = ref('')

  function createRoom() {
    socket.emit('createRoom', name.value)
  }

  function joinRoom() {
    if (roomCode.value.length === 0) {
      alert('Please enter a room code')
      return
    }
    socket.emit('joinRoom', {code: roomCode.value, name: name.value})
  }

  function handleCreated(data) {
    emit('room-created', data)
  }
  function handleJoined(data) {
    if (!data.ok){
      alert(data.error)
      return;
    }
    emit('room-joined', data)
  }

  onMounted(() => {
    socket.on('roomCreated', handleCreated);
    socket.on('roomJoined', handleJoined);
  })

  onBeforeUnmount(() => {
    socket.off('roomCreated', handleCreated)
    socket.off('roomJoined', handleJoined)
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
        class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow transition"
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
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button
        @click="joinRoom"
        class="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-lg shadow transition"
      >
        Join Room
      </button>

    </div>
  </div>
</template>
