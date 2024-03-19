//Importazione del router
import { createRouter, createWebHistory } from 'vue-router'

//Views (non lazy loading)
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"
import Login from "../views/authentication/Login.vue"

//Inizializzazione delle routes in una variabile
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/password-reset',
        name: 'Password-reset',
        component: ()=>import('../views/authentication/PasswordReset.vue') //Questa sintassi permette il lazy loading della rotta
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/note',
        name: 'Note',
        component: ()=>import('../views/Notes.vue')
    },
];

//Inizializzazione del router
const router = createRouter({
    history: createWebHistory(),
    routes
})

//Esportazione del router
export default router