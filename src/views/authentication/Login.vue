<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const form = reactive({
        email: '',
        password: ''
    });

    const message = ref();

    //Funzione per l'invio del form di login
    function submit() {
        //Resetto il messaggio di errore precedente (se presente)
        message.value = '';

        //Invio dei dati del form tramite POST. Se il login ha successo, si salva il token per l'autenticazione e si viene reindirizzati alla home
        axios.post('login', form)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            router.push({ name: 'Home' });
        })
        //Se avviene un errore, viene mostrato il messaggio
        .catch(error => {
            if (error.response.status === 422) {
                message.value = error.response.data.message;
            }
        })
        //Cancello la password inviata col form per sicurezza
        .finally(() => form.password = '');
    }
</script>

<template>
    <h1 class="text-4xl font-bold">Login</h1>

    <div>
        <p v-if="message" class="error">{{ message }}</p>
        <form @submit.prevent="submit" class="login">
            <div class="form-group">
                <label>Email</label>
                <input v-model="form.email" type="text" class="form-input">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="form.password" type="password" class="form-input">
            </div>
            <div class="form-group">
                <button type="submit" class="form-input btn">Login</button>
            </div>
        </form>
    </div>
</template>