<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {
        axios.get("http://localhost:8000/api/user");
    }
}
</script>

<template>
    <div class="home">
        <h1 class="text-4xl font-bold">Home</h1>
    </div>
</template>