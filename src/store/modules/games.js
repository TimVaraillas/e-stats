import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _cloneDeep from 'lodash/cloneDeep';

moment.locale('fr');

export default {
  namespaced: true,
  state: () => ({
    all: [],
  }),
  getters: {
    getGameById(state) {
      return (id) => state.all
        .map((game) => ({ ...game, datetime: moment(game.datetime).valueOf() }))
        .find((game) => game.id === id);
    },

    getGamesGroupByDate(state) {
      const all = state.all.map((game) => ({
        ...game,
        time: moment(game.datetime).format('LT'),
      }));
      return _groupBy(all, (game) => moment(game.datetime).format('YYYY-MM-DD'));
    },

    getPlayers(state) {
      return (id, team) => {
        const game = _cloneDeep(state.all.find((g) => g.id === id));
        return game[team].players.sort((a, b) => a.number - b.number);
      };
    },
  },
  actions: {
    async getAllGames({ commit }) {
      this.$axios.get('/games').then((response) => {
        commit('setGames', response.data);
      });
    },

    async addGame({ commit }, game) {
      this.$axios.post('/games', game).then((response) => {
        commit('addGame', response.data);
      });
    },

    async updateGame({ commit }, game) {
      this.$axios.put(`/games/${game.id}`, game).then((response) => {
        commit('updateGame', response.data);
      });
    },

    async deleteGame({ commit }, gameId) {
      this.$axios.delete(`/games/${gameId}`).then((response) => {
        if (response.data.deleted) {
          commit('deleteGame', gameId);
        }
      });
    },

    async addPlayer({ commit }, { gameId, team, player }) {
      this.$axios.put(`/games/${gameId}/players/${team}`, { player }).then((response) => {
        commit('updateGame', response.data);
      });
    },
  },
  mutations: {
    setGames(state, games) {
      state.all = games;
    },

    addGame(state, addedGame) {
      state.all.push(addedGame);
    },

    updateGame(state, updatedGame) {
      const index = state.all.findIndex((o) => o.id === updatedGame.id);
      if (index !== -1) state.all[index] = updatedGame;
    },

    deleteGame(state, deletedGameId) {
      const index = state.all.findIndex((o) => o.id === deletedGameId);
      if (index !== -1) state.all.splice(index, 1);
    },
  },
};
