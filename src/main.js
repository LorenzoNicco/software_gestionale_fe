import { createApp } from 'vue'
import './style.css'
//Importazione fle css con reset delle regole per tailwind
import './output.css'
import App from './App.vue'

//Importazione del router dal file dedicato
import router from './router/index.js'

createApp(App).use(router).mount('#app')
