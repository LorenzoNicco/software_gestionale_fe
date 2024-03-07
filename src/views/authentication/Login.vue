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
            }
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
    <div class="h-full w-screen flex justify-center items-center bg-red-500">        
        <div class="bg-white rounded">
            <h1 class="text-4xl font-bold">Login o registrati</h1>

            <form @submit.prevent="submitLogin">
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="formLogin.email" type="text" class="input input-bordered w-full max-w-xst">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="formLogin.password" type="password" class="input input-bordered w-full max-w-xst">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="form-input btn">Login</button>
                </div>
            </form>
    
            <hr class="border-black my-5">
    
            <form @submit.prevent="submitRegister">
                <div class="form-group">
                    <label>Nome</label>
                    <input v-model="formRegister.name" type="text" class="input input-bordered w-full max-w-xs">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="formRegister.email" type="text" class="input input-bordered w-full max-w-xs">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="formRegister.password" type="password" class="input input-bordered w-full max-w-xs">
                </div>
                <div class="form-group">
                    <label>Conferma password</label>
                    <input v-model="formRegister.password_confirmation" type="password" class="input input-bordered w-full max-w-xs">
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="form-input btn">Registrati</button>
                </div>
            </form>
        </div>
    </div>
</template>