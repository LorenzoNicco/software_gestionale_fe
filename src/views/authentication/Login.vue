<script>
    import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            // router: useRouter(),
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        //Funzione per l'invio del form di login
        submit() {
            axios.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(()=>{
                axios.post("http://localhost:8000/login", {
                    email: this.form.email,
                    password: this.form.password
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
    <h1 class="text-4xl font-bold">Login</h1>

    <div>
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