import { createApp } from 'vue'
import App from './App.vue'

import 'semantic-ui-css/semantic.css';
import router from './router'

createApp(App).use(router).mount('#app')
