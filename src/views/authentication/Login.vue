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
            .then(()=>{
                axios.post("http://localhost:8000/login", {
                    email: this.formLogin.email,
                    password: this.formLogin.password
                }).then(()=>{
                    this.$router.push("/");
                    axios.get("http://localhost:8000/api/user")
                    .then((response)=>{
                        console.log(response.data);
                    });                    
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
    <div class="h-full flex justify-center items-center bg-sky-500">        
        <div class="bg-white rounded-xl text-center p-8">
            <h1 v-if="loginFlag === true" class="text-4xl font-bold">Esegui il login</h1>
            <h1 v-else class="text-4xl font-bold">Crea un account</h1>

            <form v-if="loginFlag === true" @submit.prevent="submitLogin" class="py-5">
                <div class="form-group mb-2">
                    <label>Email</label>
                    <input v-model="formLogin.email" type="text" class="input input-bordered w-full max-w-xst">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="formLogin.password" type="password" class="input input-bordered w-full max-w-xst">
                </div>
                <div class="form-group text-center pt-3">
                    <button type="submit" class="form-input btn bg-orange-300 w-full">Login</button>
                </div>
            </form>
            <form v-else @submit.prevent="submitRegister" class="py-5">
                <div class="form-group mb-2">
                    <label>Nome</label>
                    <input v-model="formRegister.name" type="text" class="input input-bordered w-full">
                </div>
                <div class="form-group mb-2">
                    <label>Email</label>
                    <input v-model="formRegister.email" type="text" class="input input-bordered w-full">
                </div>
                <div class="form-group mb-2">
                    <label>Password</label>
                    <input v-model="formRegister.password" type="password" class="input input-bordered w-full">
                </div>
                <div class="form-group">
                    <label>Conferma password</label>
                    <input v-model="formRegister.password_confirmation" type="password" class="input input-bordered w-full">
                </div>
                <div class="form-group text-center pt-3">
                    <button type="submit" class="form-input btn bg-orange-300 w-full">Registrati</button>
                </div>
            </form>

            <div>
                <h4>Oppure 
                    <span v-if="loginFlag === true" v-on:click="loginFlag = false" class="font-semibold hover:text-sky-700 hover:cursor-pointer">crea un account</span>
                    <span v-else v-on:click="loginFlag = true" class="font-semibold hover:text-sky-700 hover:cursor-pointer">esegui il login</span>
                </h4>
            </div>
        </div>
    </div>
</template>