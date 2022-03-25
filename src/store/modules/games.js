export default {
  namespaced: true,
  state: () => ({
    all: [],
  }),
  getters: {},
  actions: {
    async getAllGames({ commit }) {
      this.$axios.get('/games').then((response) => {
        commit('setGames', response.data);
      });
    },
    async addGame({ commit }, game) {
      this.$axios.post('/games', game).then((response) => {
        console.log(response.data);
        commit('addGame', response.data);
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
  },
};
