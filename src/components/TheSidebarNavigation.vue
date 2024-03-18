<script>
    import TheRouterLinkSidebar from './TheRouterLinkSidebar.vue';

    export default {
        data() {
            return {
                routesTopMenu: [
                    {
                        path: '/',
                        icon: 'house',
                        title: 'Home',
                    },
                    {
                        path: '/note',
                        icon: 'note-sticky',
                        title: 'Note',
                    },
                ],                
                routesBottomMenu: [
                    {
                        path: '/profile',
                        icon: 'user',
                        title: 'Profilo',
                    }
                ]
            }
        },
        components: {
            TheRouterLinkSidebar,
        },
        methods: {

        },
        mounted() {
        },
    }
</script>

<template>
    <aside id="sidebar" class="w-1/6 h-full flex flex-col justify-between p-2 bg-cyan-600">
        <!-- Sezione superiore -->
        <div>
            <!-- LOGO -->
            <div id="logo-container">
                <!-- Logo placeholder -->
                <h2 class="text-xl font-bold">LOGO</h2>
            </div>
    
            <!-- Pulsanti di navigazione -->
            <TheRouterLinkSidebar :routesMenu="routesTopMenu"/>

        </div>

        <!-- Sezione inferiore -->
        <!-- Pulsanti di navigazione -->
        <TheRouterLinkSidebar :routesMenu="routesBottomMenu"/>
    </aside>
</template>