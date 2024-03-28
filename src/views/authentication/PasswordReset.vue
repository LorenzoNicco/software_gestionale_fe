<script>
//Composables
import { useOpenNotification } from '../../composables/openNotification.js';

export default {
    data() {
        return {
            formResetPassword: {
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
        //Metodo per resettare la password
        submitPasswordReset() {
            axios.post("http://localhost:8000/reset-password", {
                token: this.$route.params.token,
                email: this.$route.query.email,
                password: this.formResetPassword.password,
                password_confirmation: this.formResetPassword.password_confirmation
            }).then(()=>{
                //Reindirizzo al login
                this.$router.push("/login");

                useOpenNotification({ id: 'pw-modificata', bgType: 'bg-success', message: 'La tua password è stata modificata con successo.' });                
            });
        }
    },
    mounted() {
    },
    props: [
        // "userData" //Dati utente passati da App.vue
    ]
}
</script>

<template>
    <div class="h-full w-full flex justify-center items-center bg-sky-500">
        <div class="w-1/3 bg-white rounded-xl text-center p-8">
            <h1 class="text-4xl font-bold">Scegli una nuova password</h1>

            <!-- Form per la nuova password -->
            <form @submit.prevent="submitPasswordReset" class="py-5">
                <input v-model="formResetPassword.password" type="password" placeholder="Nuova password" class="input input-bordered w-full mb-2" minlength="8" maxlength="16" required>

                <input v-model="formResetPassword.password_confirmation" type="password" placeholder="Conferma la nuova password" class="input input-bordered w-full mb-4" minlength="8" maxlength="16" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Invia</button>
            </form>
        </div>
    </div>      
</template>