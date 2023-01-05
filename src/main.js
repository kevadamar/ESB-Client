import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
// import VueTailwind from 'vue-tailwind';

// const components = {
//   //...
// };


// app.use(VueTailwind, components);
const app = createApp(App);

app.use(router);

app.mount('#app');
