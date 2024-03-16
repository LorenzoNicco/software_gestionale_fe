<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            //Funzione per il logout
            signOut() {
                axios.post("http://localhost:8000/logout");
                this.$router.push("/login");
            }
        },
        mounted() {
        },
        props: [
            "userData" //Dati utente passati da App.vue
        ]
    }
</script>

<template>
    <div class="profile">
        <h1 class="text-4xl font-bold">Profilo</h1>

        <div>
            <div>User ID: {{ userData.id }}</div>
            <div>Email Address: {{ userData.email }}</div>
            <div>
                <button @click="signOut" class="btn">Sign Out</button>
            </div>
        </div>
    </div>
</template>