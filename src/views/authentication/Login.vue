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
    <h1 class="text-4xl font-bold">Login o registrati</h1>

    <div>
        <form @submit.prevent="submitLogin">
            <div class="form-group">
                <label>Email</label>
                <input v-model="formLogin.email" type="text" class="form-input">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="formLogin.password" type="password" class="form-input">
            </div>
            <div class="form-group">
                <button type="submit" class="form-input btn">Login</button>
            </div>
        </form>

        <hr>

        <form @submit.prevent="submitRegister">
            <div class="form-group">
                <label>Nome</label>
                <input v-model="formRegister.name" type="text" class="form-input">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input v-model="formRegister.email" type="text" class="form-input">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="formRegister.password" type="password" class="form-input">
            </div>
            <div class="form-group">
                <label>Conferma password</label>
                <input v-model="formRegister.password_confirmation" type="password" class="form-input">
            </div>
            <div class="form-group">
                <button type="submit" class="form-input btn">Registrati</button>
            </div>
        </form>
    </div>
</template>