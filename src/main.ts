import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import './assets/core.css';
import './assets/main.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/ToastService';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
