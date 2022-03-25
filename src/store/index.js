import { createStore, createLogger } from 'vuex';
import games from './modules/games';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    games,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
