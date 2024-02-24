//Importazione del router
import { createRouter, createWebHistory } from 'vue-router'

//Views
import Home from "../views/Home.vue"
import About from "../views/About.vue"

//Inizializzazione delle routes in una variabile
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
];

//Inizializzazione del router
const router = createRouter({
    history: createWebHistory(),
    routes
})

//Esportazione del router
export default router