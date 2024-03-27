<script>
    export default {
        name: "TheRouterLinkSidebar",
        data() {
            return {
            }
        },
        methods: {

        },
        mounted() {
        },
        props: [
            "routesMenu"
        ]
    }
</script>

<template>
    <nav>
        <ul>
            <li v-for="route in routesMenu">                    
                <router-link :to="route.path" class="btn btn-outline my-aside-btn">
                    <font-awesome-icon :icon="['fas', route.icon]" />

                    <span>{{ route.title }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>