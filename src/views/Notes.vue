<script>
export default {
    data() {
        return {
            notesData: ''
        }
    },
    methods: {
        notesDataRethrieve() {            
            axios.get("http://localhost:8000/api/notes")
            .then((response) => {
                this.notesData = response.data.notes;
                console.log(this.notesData);
            });
        }
    },
    mounted() {
        this.notesDataRethrieve();
    }
}
</script>

<template>
    <div class="about">
        <h1 class="text-4xl font-bold">Note</h1>

        <div>
            <ul>
                <li v-for="singleNote in notesData">
                    <h4>Titolo: {{ singleNote.title }}</h4>
                    <p>Testo: {{ singleNote.noteBody }}</p>

                    <hr>
                </li>
            </ul>
        </div>
    </div>
</template>