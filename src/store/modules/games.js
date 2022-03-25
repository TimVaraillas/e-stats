export default {
  namespaced: true,
  state: () => ({
    all: [],
  }),
  getters: {},
  actions: {
    async getAllGames({ commit }) {
      const games = [
        { name: 'Match 1' },
        { name: 'Match 2' },
        { name: 'Match 3' },
        { name: 'Match 4' },
      ];
      commit('setGames', games);
    },
    async addGame({ commit }, game) {
      commit('addGame', game);
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
