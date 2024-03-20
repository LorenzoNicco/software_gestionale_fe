<script>
    import ThePageTitle from '../components/ThePageTitle.vue';
    export default {
        data() {
            return {
            }
        },
        components: {
            ThePageTitle,
        },
        methods: {

        },
        props: [
            "userData" //Dati utente passati da App.vue
        ],
        mounted() {
        },
    }
</script>

<template>
    <div class="home">
        <ThePageTitle title="Home"/>
    </div>
</template>