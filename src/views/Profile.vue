<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const userData = reactive({
        user: {}
    });

    //Reperisco i dati dell'utente
    function fetchUserDetails() {
        axios.get('user').then(response => {
            userData.user = response.data;
        });
    }

    //Funzione per il logout
    function signOut() {
        axios.post('logout').finally(() => {
            //Elimino il token salvato in locale
            localStorage.removeItem('token');
            //Resetto l'axios authentication header
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            //Reindirizzo l'utente alla pagina di login
            router.push({ name: 'Login' });
        });
    }

    onMounted(fetchUserDetails);
</script>

<template>
    <div class="about">
        <h1 class="text-4xl font-bold">Profilo</h1>

        <div>
            <div>User ID: {{ userData.user.id }}</div>
            <div>Email Address: {{ userData.user.email }}</div>
            <div>
                <button @click="signOut" class="btn">Sign Out</button>
            </div>
        </div>
    </div>
</template>