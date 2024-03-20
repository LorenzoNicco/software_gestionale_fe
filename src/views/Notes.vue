<script>
    import ThePageTitle from '../components/ThePageTitle.vue';
    
    export default {
        data() {
            return {
                notesData: '',
                updateCollapseFlag: false,
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
        components: {
            ThePageTitle,
        },
        methods: {
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
                    console.log(response);
                });
            },

            //Funzione per aprire e chiudere la finestra di modifica della nota
            updateAccordionToggle(targetId) {
                this.formEntriesReset(this.formUpdateNotes, 'update_note_form');

                //Apro o chiudo il contenitore del form di modifica della nota in questione
                let updateAccordion = document.getElementById(targetId);
                updateAccordion.classList.toggle('collapse-close');
                updateAccordion.classList.toggle('collapse-open');

                //Setto la flag per cambiare l'icona del pulsante del collapse
                if(this.updateCollapseFlag === false) {
                    this.updateCollapseFlag = true;
                } else {
                    this.updateCollapseFlag = false;
                }
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

                //Resetto la flag per l'icona del collapse
                this.updateCollapseFlag = false;
            },

            //Funzione per aprire o chiudere le modali
            openOrCloseModal(modalId) {
                const targetModal = document.getElementById(modalId);

                if(targetModal.hasAttribute(open)) {
                    targetModal.close();
                } else {
                    targetModal.showModal();
                }
            },

            //Funzione per eliminare la nota
            deleteNote(noteTitle, noteId) {
                //Chiudo la modale di cancellazione
                this.openOrCloseModal('delete_note_' + noteId + '_modal');

                //Elimino la nota
                axios.delete("http://localhost:8000/api/notes/" + noteId)
                .then((response) => {          
                    //Mostro all'utente un messaggio di conferma         
                    alert('Nota "' + noteTitle + '" eliminata con successo.');

                    //Refresho le note esistenti
                    this.notesDataRethrieve();                
                });
            }
        },
        created() {
            this.notesDataRethrieve();
        },
    }
</script>

<template>
    <div class="notes relative pb-14">
        <!-- Titolo pagina -->
        <ThePageTitle title="Note"/>

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
                                <font-awesome-icon v-if="updateCollapseFlag === false" :icon="['fas', 'pen-to-square']" /> <!-- Icona con il collapse chiuso-->
                                <font-awesome-icon v-else :icon="['fas', 'xmark']" /> <!-- Icona con il collapse aperto-->
                            </button>
                            
                            <!-- Pulsante di elimina nota -->
                            <button class="btn btn-error btn-sm btn-square ms-2" v-on:click="openOrCloseModal('delete_note_' + singleNote.id + '_modal')">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>

                            <!-- Modale di eliminazione nota -->
                            <dialog :id="'delete_note_' + singleNote.id + '_modal'" class="modal">
                                <div class="modal-box">
                                    <h3 class="font-bold text-lg">Sicuro di voler eliminare la nota "{{ singleNote.title }}"?</h3>

                                    

                                    <div class="modal-action">
                                        <button class="btn btn-error ms-2" v-on:click="deleteNote(singleNote.title, singleNote.id)">Conferma</button>

                                        <form method="dialog">
                                            <button class="btn btn-success">Annulla</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>

                    <!-- Collapse per la modifica delle note -->
                    <div :id="singleNote.id" class="collapse collapse-close collapse_update"> 
                        <form :id="'update_note_' + singleNote.id" class="collapse-content update_note_form flex flex-col">
                            <input v-model="formUpdateNotes.title" type="text" placeholder="Nuovo titolo" class="input input-bordered w-full" name="title" minlength="1" maxlength="50" required />

                            <textarea v-model="formUpdateNotes.noteBody" class="textarea textarea-bordered my-4" placeholder="Nuovo testo della nota" name="noteBody" required></textarea>

                            <input v-on:click.prevent="noteUpdate('update_note_' + singleNote.id, singleNote.id)" type="submit" value="Invia" class="btn btn-success self-end">
                        </form>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Pulsante di aggiunta nota -->
        <div class="fixed bottom-5 right-5">
            <button class="btn btn-success" v-on:click="openOrCloseModal('insert_note_modal')">
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
                        <form method="dialog" class="w-full">
                            <button class="btn btn-error w-full">Annulla</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</template>