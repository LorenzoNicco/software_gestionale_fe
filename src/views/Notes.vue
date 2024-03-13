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
            formUpdateNotes: { //Campi per modificare le note
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
                this.formEntriesReset(this.formStoreNotes, 'new_note_form');
            });
        },

        //Funzione per aprire e chiudere la finestra di modifica della nota
        updateAccordionToggle(targetId) {
            this.formEntriesReset(this.formUpdateNotes, 'update_note_form');

            //Apro o chiudo il contenitore del form di modifica della nota in questione
            let updateAccordion = document.getElementById(targetId);
            updateAccordion.classList.toggle('collapse-close');
            updateAccordion.classList.toggle('collapse-open');
        },

        //Funzione per modificare le note
        noteUpdate(formId, noteId) {
            axios.put("http://localhost:8000/api/notes/" + noteId, {
                title: this.formUpdateNotes.title,
                noteBody: this.formUpdateNotes.noteBody,
            })
            .then((response) => {                
                //Refresho le note esistenti
                this.notesDataRethrieve();

                //Svuoto tutti i campi del form e del data
                this.formEntriesReset(this.formUpdateNotes, formId)
            });
        },

        //Funzione per svuotare i campi provenienti dai form in data e i form
        formEntriesReset(dataToReset, formToReset) {
            //Prendo tutti i form da svuotare
            const formsToReset = document.getElementsByClassName(formToReset);

            //Svuoto il form
            for(let i = 0; i < formsToReset.length; i++) {
                formsToReset[i].reset();
            }

            //Svuoto i dati provenienti dal form in data
            for (let singleData in dataToReset) {
                dataToReset[singleData] = '';
            }
        },

        //Funzione che chiude il collapse di modifica di ogni nota all'apertura di un'altra nota
        closeEveryUpdateCollapse() {
            //Prendo tutti collapse di modifica
            const updateCollapseList = document.getElementsByClassName('collapse_update');

            //Tolgo la classe open, se presente, e aggiungo quella close
            for( let i = 0; i < updateCollapseList.length; i++) {
                if(updateCollapseList[i].classList.contains('collapse-open')) {
                    updateCollapseList[i].classList.remove('collapse-open');
                    updateCollapseList[i].classList.add('collapse-close');
                }
            }
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
                    <input type="radio" name="my-accordion-2" v-on:click="closeEveryUpdateCollapse" /> 

                    <!-- Titolo della nota -->
                    <div class="collapse-title text-xl font-medium">{{ singleNote.title }}</div>

                    <div class="collapse-content flex justify-between"> 
                        <!-- Testo della nota -->
                        <p>{{ singleNote.noteBody }}</p>

                        <div>
                            <!-- Pulsante di modifica nota -->
                            <button v-on:click="updateAccordionToggle(singleNote.id)" class="btn btn-warning btn-sm btn-square">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </button>
                            
                            <!-- Pulsante di elimina nota -->
                            <button class="btn btn-error btn-sm btn-square ms-2">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>
                        </div>
                    </div>

                    <div :id="singleNote.id" class="collapse collapse-close collapse_update"> 
                        <form :id="'update_note_' + singleNote.id" class="collapse-content update_note_form">
                            <input v-model="formUpdateNotes.title" type="text" placeholder="Nuovo titolo" class="input input-bordered w-full" name="title" minlength="1" maxlength="50" required />

                            <textarea v-model="formUpdateNotes.noteBody" class="textarea textarea-bordered my-4" placeholder="Nuovo testo della nota" name="noteBody" required></textarea>

                            <input v-on:click.prevent="noteUpdate('update_note_' + singleNote.id, singleNote.id)" type="submit" value="Invia" class="btn btn-success">
                        </form>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Pulsante di aggiunta nota -->
        <div class="fixed bottom-5 right-5">
            <button class="btn btn-success" onclick="insert_note_modal.showModal()">
                <span>Nuova nota</span> <font-awesome-icon :icon="['fas', 'plus']" />
            </button>

            <!-- Modale di aggiunta nota -->
            <dialog id="insert_note_modal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Inserisci una nuova nota</h3>

                    <!-- Form per la creazione di una nuova nota -->
                    <form class="new_note_form flex flex-col my-4">
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