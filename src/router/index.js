//Importazione del router
import { createRouter, createWebHistory } from 'vue-router'

//Views
import Home from "../views/Home.vue"

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
        component: ()=>import('../views/About.vue')
    },
];

//Inizializzazione del router
const router = createRouter({
    history: createWebHistory(),
    routes
})

//Esportazione del router
export default router