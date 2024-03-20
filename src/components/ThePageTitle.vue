<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    props: {
        title: String
    },
    mounted() {
    },
}
</script>

<template>
    <!-- Titolo pagina -->
    <div class="w-full p-4 rounded-xl bg-orange-300 shadow-md mb-4">
        <h1 class="text-4xl font-bold">{{ title }}</h1>
    </div>
</template>