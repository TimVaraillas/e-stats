<template>
  <div class="about">
    <h1>Add a new game</h1>
    <ul>
      <li v-for="game of games" :key="game.name">
        {{ game.name }}
      </li>
    </ul>
    <el-form label-position="top" :model="game">
      <el-form-item label="Name">
        <el-input v-model="game.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGame(game)">Créer</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AddGameView',
  data() {
    return {
      game: { name: '' },
    };
  },
  computed: {
    ...mapState('games', {
      games: 'all',
    }),
  },
  mounted() {
    this.getAllGames();
  },
  methods: {
    ...mapActions('games', [
      'getAllGames',
      'addGame',
    ]),
  },
};
</script>
