import { createApp } from 'vue'
import App from './App.vue'

//Importazione file CSS con collegamenti a tailwind
import './style.css'

//Importazione fle CSS con reset delle regole per tailwind
import './output.css'

//Importazione file CSS con regole di override
import './override.css'

//Importazione del router dal file dedicato
import router from './router/index.js'

//Importazione axios
import axios from 'axios';
// Settaggio globale di axios
window.axios = axios;

//Configurazione di axios per includere le credenziali
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

//Redirect al login in caso di utente non autenticato
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // if (error.request.status === 403) {
    //     // redirect to a 403 page informing
    //     // the action is forbidden
    //     router.push('/403');
    // }
    
    if ([401, 419].includes(error.request.status) && !window.location.href.includes('password-reset')) {
        // redirect al login se l'utente non è autenticato o se non sta cercando di recuperare la password
        router.push('/login');
    }
    return Promise.reject(error);
});

//Importazione FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
