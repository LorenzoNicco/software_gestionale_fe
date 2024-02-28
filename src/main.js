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
// Configurazione degli headers di default
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Definizione dell'url di base per tutte le richieste axios
axios.defaults.baseURL = 'http://<YOUR-LARAVEL-API-SERVER>/api';
// Se c'è un token nel localStorage, settarlo come default Authorization header
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
// Gestione della scadenza dei token e di quelli invalidi
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Rimozione del token dal local storage:
            localStorage.removeItem('token');
            // Reset dell'axios Authorization header:
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            // Redirect l'utente alla login page:
            router.push({ name: 'Login' });
        }
        return Promise.reject(error);
    }
);

//Importazione FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
