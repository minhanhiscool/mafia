import { createRouter, createWebHistory } from 'vue-router';

import Lobby from './components/Lobby.vue';
import Player from './components/Player.vue';
import Admin from './components/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/room/:roomCode/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/room/:roomCode/admin',
    name: 'Admin',
    component: Admin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
