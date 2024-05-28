import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const pinia = createPinia();
const vuetify = createVuetify({
    components: components,
    directives: directives
});

createApp(App).use(router).use(pinia).use(ToastPlugin).use(vuetify).mount('#app');
