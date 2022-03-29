import { createApp } from 'vue';

import axios from 'axios';

import 'normalize.css/normalize.css';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import router from './router';
import store from './store';

import App from './App.vue';

library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3000';
app.config.globalProperties.$axios = axios;
store.$axios = axios;

app.use(store);
app.use(router);
app.mount('#app');
