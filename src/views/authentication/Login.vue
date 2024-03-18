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
            loginFlag: true
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
                        console.log(response.data);
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
        }
    }
}
</script>

<template>
    <div class="h-full w-full flex justify-center items-center bg-sky-500">        
        <div class="w-1/3 bg-white rounded-xl text-center p-8">
            <h1 v-if="loginFlag === true" class="text-4xl font-bold">Effettua il login</h1>
            <h1 v-else class="text-4xl font-bold">Crea un account</h1>

            <!-- Form per il login -->
            <form v-if="loginFlag === true" @submit.prevent="submitLogin" class="py-5">
                <input v-model="formLogin.email" type="text" placeholder="Email" class="input input-bordered w-full mb-2" pattern="[a-z0-9._%+\-]+@{1}[a-z0-9.\-]+\.[a-z]{2,}$" required>

                <input v-model="formLogin.password" type="password" placeholder="Password" class="input input-bordered w-full mb-4" minlength="8" maxlength="16" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Login</button>
            </form>
            <!-- Form per la registrazione -->
            <form v-else @submit.prevent="submitRegister" class="py-5">
                <input v-model="formRegister.name" type="text" placeholder="Nome" class="input input-bordered w-full mb-2" pattern="(\b[A-ZÀ-ÿ]{1}[\-,a-z. ']+[ ]{1})+$" required>

                <input v-model="formRegister.email" type="text" placeholder="Email" class="input input-bordered w-full mb-2" pattern="[a-z0-9._%+\-]+@{1}[a-z0-9.\-]+\.[a-z]{2,}$" required>

                <input v-model="formRegister.password" type="password" placeholder="Password" class="input input-bordered w-full mb-2" minlength="8" maxlength="16" required>

                <input v-model="formRegister.password_confirmation" type="password" placeholder="Conferma password" class="input input-bordered w-full mb-4" minlength="8" maxlength="16" required>

                <button type="submit" class="form-input btn bg-orange-300 w-full">Registrati</button>
            </form>

            <!-- Pulsanti per il cambio di form -->
            <div>
                <h4>Oppure 
                    <span v-if="loginFlag === true" v-on:click="loginFlag = false" class="font-semibold hover:text-sky-700 hover:cursor-pointer">crea un account</span>
                    <span v-else v-on:click="loginFlag = true" class="font-semibold hover:text-sky-700 hover:cursor-pointer">effettua il login</span>
                </h4>
            </div>
        </div>
    </div>
</template>