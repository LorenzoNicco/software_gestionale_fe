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

//Configurazione di axios per includere le credenziali
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // if (error.request.status === 403) {
    //     // redirect to a 403 page informing
    //     // the action is forbidden
    //     router.push('/403');
    // }
    
    if ([401, 419].includes(error.request.status)) {
        // redirect al login
        router.push('/Login');
    }
    return Promise.reject(error);
});

//Importazione FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
