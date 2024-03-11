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
            });
        }
    },
    mounted() {
        this.notesDataRethrieve();
    }
}
</script>

<template>
    <div class="notes relative">
        <!-- Titolo pagina -->
        <div class="w-full p-4 rounded-xl bg-orange-300 shadow-md mb-4">
            <h1 class="text-4xl font-bold">Note</h1>
        </div>

        <div class="w-full">
            <ul>
                <!-- Elemento della lista delle note -->
                <li v-for="singleNote in notesData" class="collapse collapse-arrow shadow-md">
                    <input type="radio" name="my-accordion-2" checked="checked" /> 

                    <!-- Titolo della nota -->
                    <div class="collapse-title text-xl font-medium">{{ singleNote.title }}</div>

                    <div class="collapse-content flex justify-between"> 
                        <!-- Testo della nota -->
                        <p>{{ singleNote.noteBody }}</p>

                        <div>
                            <!-- Pulsante di modifica nota -->
                            <button class="btn btn-warning btn-sm btn-square">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </button>
                            
                            <!-- Pulsante di elimina nota -->
                            <button class="btn btn-error btn-sm btn-square ms-2">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Pulsante di aggiunta nota -->
        <div class="fixed bottom-5 right-5">
            <button class="btn btn-success">
                <span>Nuova nota</span> <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
    </div>
</template>