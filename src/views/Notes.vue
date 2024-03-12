<script>
export default {
    data() {
        return {
            userData: '',
            notesData: '',
            formStoreNotes: { //Campi per le nuove note
                title: '',
                noteBody: ''
            },
        }
    },
    methods: {
        //Reperisco i dati dell'utente e li salvo in userData
        fetchUserDetails() {
            axios.get("http://localhost:8000/api/user")
            .then((response) => {
                this.userData = response.data;
            });
        },

        //Funzione per reperire le note esistenti
        notesDataRethrieve() {            
            axios.get("http://localhost:8000/api/notes")
            .then((response) => {
                this.notesData = response.data.notes;
            });
        },

        //Funzione per creare delle nuove note
        newNoteCreation() {
            axios.post("http://localhost:8000/api/notes", {
                title: this.formStoreNotes.title,
                noteBody: this.formStoreNotes.noteBody,
                user_id: this.userData.id
            })
            .then((response) => {                
                //Refresho le note esistenti
                this.notesDataRethrieve();

                //Svuoto tutti i campi del form e deil data
                document.getElementById('new_note_form').reset();
                this.formStoreNotes.title = '';
                this.formStoreNotes.noteBody = '';

                console.log('creazione', response.data.notes);
            });
        }
    },
    mounted() {
        this.fetchUserDetails();
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
                    <input type="radio" name="my-accordion-2" /> 

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
            <button class="btn btn-success" onclick="insert_note_modal.showModal()">
                <span>Nuova nota</span> <font-awesome-icon :icon="['fas', 'plus']" />
            </button>

            <dialog id="insert_note_modal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Inserisci una nuova nota</h3>

                    <!-- Form per la creazione di una nuova nota -->
                    <form id="new_note_form"  class="flex flex-col my-4">
                        <input v-model="formStoreNotes.title" type="text" placeholder="Titolo" class="input input-bordered w-full" name="title" minlength="1" maxlength="50" required />

                        <textarea v-model="formStoreNotes.noteBody" class="textarea textarea-bordered my-4" placeholder="Testo della nota" name="noteBody" required></textarea>

                        <input v-on:click.prevent="newNoteCreation" type="submit" value="Invia" class="btn btn-success">
                    </form>

                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</template>