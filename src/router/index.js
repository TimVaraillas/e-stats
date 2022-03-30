import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Mes matchs',
    component: () => import('../views/games/GamesListView.vue'),
  },
  {
    path: '/game/:id/players',
    name: 'Joueurs',
    component: () => import('../views/games/GamePlayersView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
