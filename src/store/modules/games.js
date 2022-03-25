import moment from 'moment';

moment.locale('fr');

export default {
  namespaced: true,
  state: () => ({
    all: [],
  }),
  getters: {
    all(state) {
      return state.all.map((game) => {
        const dtStr = moment(game.datetime).format('LLLL');
        return {
          ...game,
          datetime: dtStr[0].toUpperCase() + dtStr.slice(1),
        };
      });
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
    async deleteGame({ commit }, gameId) {
      this.$axios.delete(`/games/${gameId}`).then((response) => {
        if (response.data.deleted) {
          commit('deleteGame', gameId);
        }
      });
    },
  },
  mutations: {
    setGames(state, games) {
      state.all = games;
    },
    addGame(state, game) {
      state.all.push(game);
    },
    deleteGame(state, gameId) {
      const index = state.all.findIndex((o) => o.id === gameId);
      if (index !== -1) state.all.splice(index, 1);
    },
  },
};
