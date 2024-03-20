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
            //Funzione per il logout
            signOut() {
                axios.post("http://localhost:8000/logout");
                this.$router.push("/login");
            }
        },
        props: [
            "userData"
        ],
        mounted() {
        },
    }
</script>

<template>
    <div class="profile">
        <!-- Titolo pagina -->
        <ThePageTitle title="Profilo"/>

        <div class="card w-1/2 shadow-lg bg-cyan-200 mb-4">
            <div class="card-body">
                <div>
                    <h2 class="card-title inline-block me-3">ID utente:</h2>
                    <p class="inline-block text-xl">{{ userData.id }}</p>
                </div>
                <div>
                    <h2 class="card-title inline-block me-3">Nome utente:</h2>
                    <p class="inline-block text-xl">{{ userData.name }}</p>
                </div>
                <div>
                    <h2 class="card-title inline-block me-3">Indirizzo email:</h2>
                    <p class="inline-block text-xl">{{ userData.email }}</p>
                </div>
            </div>
        </div>

        <div>
            <button @click="signOut" class="btn btn-error">Sign Out</button>
        </div>
    </div>
</template>