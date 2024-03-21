<script>
export default {
    data() {
        return {
            formLogin: { //Campi per il login
                email: '',
                password: ''
            },
            formRegister: { //Campi per la registrazione
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            formForgotPassword: { //Campi per il recupero della password
                email: ''
            },
            loginFlag: true,
            forgotPasswordFlag: false
        }
    },
    methods: {
        //Funzione per l'invio del form di login
        submitLogin() {
            axios.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(() => {
                axios.post("http://localhost:8000/login", {
                    email: this.formLogin.email,
                    password: this.formLogin.password
                }).then(() => {
                    this.$router.push("/");
                    axios.get("http://localhost:8000/api/user")
                    .then((response)=>{
                        //Ricarico la pagina per eseguire il metodo di raccolta dati utente da App.vue.
                        //TODO: trovare metodo alternativo
                        location.reload();
                    });                    
                }).catch((error) => { //Catturo l'errore in caso di nome utente o password errati
                    if(error.response.status == 422) {
                        alert("Nome utente o password errati. Riprovare"); //TODO: sostituire questo alert con un messaggio di errore
                    }
                });
            });
        },
        
        //Funzione per l'invio del form di registrazione
        submitRegister() {
            axios.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(()=>{
                axios.post("http://localhost:8000/register", {
                    name: this.formRegister.name,
                    email: this.formRegister.email,
                    password: this.formRegister.password,
                    password_confirmation: this.formRegister.password_confirmation
                }).then(()=>{
                    this.$router.push("/");
                    axios.get("http://localhost:8000/api/user")
                    .then((response)=>{
                        console.log(response.data);
                    });                    
                });
            });
        },

        //Funzione per l'invio del form di recupero password
        submitForgotPassword() {
            axios.post("http://localhost:8000/forgot-password", {
                email: this.formForgotPassword.email
            }).then((response) => {
                console.log(response.data);
                
                //Svuoto il campo del form per il reset della password
                this.formForgotPassword.email = '';

                alert("Controlla la tua email per reimpostare la password"); //TODO: sostituire questo alert con un messaggio di notifica
            }).catch((error) => { //Catturo l'errore eventuale
                if(error.response.status == 422) {
                    alert("L'email fornita non è corretta. Riprovare"); //TODO: sostituire questo alert con un messaggio di errore
                }
            });
        }
    }
}
</script>

<template>
    <div class="h-full w-full flex justify-center items-center bg-sky-500">        
        <div class="w-1/3 bg-white rounded-xl text-center p-8">
            <h1 v-if="loginFlag === true && forgotPasswordFlag === false" class="text-4xl font-bold">Effettua il login</h1>
            <h1 v-else-if="loginFlag === false && forgotPasswordFlag === false" class="text-4xl font-bold">Crea un account</h1>
            <h1 v-else-if="forgotPasswordFlag === true" class="text-4xl font-bold">Recupera la password</h1>

            <!-- Form per il login -->
            <form v-if="loginFlag === true && forgotPasswordFlag === false" @submit.prevent="submitLogin" class="py-5">
                <input v-model="formLogin.email" type="email" placeholder="Email" class="input input-bordered w-full mb-2" pattern="[a-z0-9._%+\-]+@{1}[a-z0-9.\-]+\.[a-z]{2,}$" required>

                <input v-model="formLogin.password" type="password" placeholder="Password" class="input input-bordered w-full mb-4" minlength="8" maxlength="16" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Login</button>
            </form>
            <!-- Form per la registrazione -->
            <form v-else-if="loginFlag === false && forgotPasswordFlag === false" @submit.prevent="submitRegister" class="py-5">
                <input v-model="formRegister.name" type="text" placeholder="Nome" class="input input-bordered w-full mb-2" pattern="(\b[A-ZÀ-ÿ]{1}[\-,a-z. ']+[ ]{1})+$" required>

                <input v-model="formRegister.email" type="text" placeholder="Email" class="input input-bordered w-full mb-2" pattern="[a-z0-9._%+\-]+@{1}[a-z0-9.\-]+\.[a-z]{2,}$" required>

                <input v-model="formRegister.password" type="password" placeholder="Password" class="input input-bordered w-full mb-2" minlength="8" maxlength="16" required>

                <input v-model="formRegister.password_confirmation" type="password" placeholder="Conferma password" class="input input-bordered w-full mb-4" minlength="8" maxlength="16" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Registrati</button>
            </form>
            <!-- Form per il recupero password -->
            <form v-if="forgotPasswordFlag === true" @submit.prevent="submitForgotPassword" class="py-5">
                <input v-model="formForgotPassword.email" type="email" placeholder="Inserisci la tua email e clicca 'Invia'" class="input input-bordered w-full mb-2" pattern="[a-z0-9._%+\-]+@{1}[a-z0-9.\-]+\.[a-z]{2,}$" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Invia</button>
            </form>

            <!-- Pulsanti per il cambio di form -->
            <div>
                <h4>                    
                    <span v-if="loginFlag === true && forgotPasswordFlag === false" v-on:click="forgotPasswordFlag = true" class="font-semibold hover:text-sky-700 hover:cursor-pointer">Password dimenticata?</span>
                    <span v-if="loginFlag === true && forgotPasswordFlag === true" v-on:click="forgotPasswordFlag = false" class="font-semibold hover:text-sky-700 hover:cursor-pointer">Torna al login</span>
                </h4>

                <hr class="my-2 border-slate-500">

                <h4 v-if="forgotPasswordFlag === false">Oppure 
                    <span v-if="loginFlag === true" v-on:click="loginFlag = false" class="font-semibold hover:text-sky-700 hover:cursor-pointer">crea un account</span>
                    <span v-else v-on:click="loginFlag = true" class="font-semibold hover:text-sky-700 hover:cursor-pointer">effettua il login</span>
                </h4>
            </div>
        </div>
    </div>
</template>