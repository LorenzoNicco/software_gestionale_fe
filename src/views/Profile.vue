<script>
    export default {
        data() {
            return {
                userData: {}, //Conterrà i dati dell'utente autenticato
            }
        },
        methods: {
            //Reperisco i dati dell'utente e li salvo in userData
            fetchUserDetails() {
                axios.get("http://localhost:8000/api/user")
                .then((response) => {
                    this.userData = response.data;
                });
            },

            //Funzione per il logout
            signOut() {
                axios.post("http://localhost:8000/logout");
                this.$router.push("/login");
            }
        },
        mounted() {
            //Attivo la funzione per reperire i dati dell'utente
            this.fetchUserDetails();
        }
    }
</script>

<template>
    <div class="about">
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