<script setup>
  import {ref} from 'vue'
  import {useRouter, useRoute} from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const room = route.params.roomCode

</script>

<template>
  <div class="min-h-screen bg-[#eed49f]">
    <div class="flex items-start justify-start pt-20 px-100 gap-64">
      <div class="bg-white shadow-lg rounded-2xl w-64 h-25 text-center">
        <p class="text-sm pt-2">The room code is:</p>
        <h1 class="text-5xl font-extrabold text-red-400 tracking-wide py-1">{{ room }}</h1>
      </div>

      <div class="bg-white/30 flex rounded-2xl w-64 h-25 justify-center items-center">
        <h1 class="text-5xl font-extrabold text-red-400 tracking-wide drop-shadow"> Mafia! </h1>
      </div>

      <div class="bg-red-400 hover:bg-green-400 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all
        flex rounded-2xl w-64 h-25 justify-center items-center cursor-pointer">
        <h1 class="text-5xl font-extrabold text-white tracking-wide py-1">Start!</h1>
      </div>

    </div>
  </div>
</template>
