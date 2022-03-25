<template>
  <div class="home">
    <h1>Welcome to E-Stats App</h1>
    <ul>
      <li v-for="game of games" :key="game.name">
        {{ game.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState('games', {
      games: 'all',
    }),
  },
  created() {
    this.getAllGames();
  },
  methods: {
    ...mapActions('games', [
      'getAllGames',
    ]),
  },
};
</script>
