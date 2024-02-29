import { createApp } from 'vue'
import './style.css'
//Importazione fle css con reset delle regole per tailwind
import './output.css'
import App from './App.vue'

//Importazione del router dal file dedicato
import router from './router/index.js'

//Importazione axios
import axios from 'axios';
// Settaggio globale di axios
window.axios = axios;

//Importazione FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
