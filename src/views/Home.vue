<script>
    //Componenti
    import ThePageTitle from '../components/ThePageTitle.vue';

    export default {
        data() {
            return {
                dataCounter: [
                    {
                        singularName: 'nota',
                        pluralName: 'note',
                        number: '',
                        path: '/note',
                        icon: 'note-sticky'
                    },
                ]
            }
        },
        components: {
            ThePageTitle,
        },
        methods: {
            //Funzione per il conteggio delle note
            notesDataCount() {            
                axios.get("http://localhost:8000/api/notes/notesCounter")
                .then((response) => {
                    this.dataCounter[0].number = response.data.notes;
                });
            },
        },
        props: [
            "userData" //Dati utente passati da App.vue
        ],
        created() {
            this.notesDataCount();
        },
    }
</script>

<template>
    <div class="home">
        <ThePageTitle title="Home"/>

        <div class="card bg-white w-full shadow-lg p-4">
            <h2 class="font-bold text-2xl">Ciao {{ userData.name }}!</h2>

            <div class="card-body w-full flex-row flex-wrap justify-between">
                <div v-for="singleData in dataCounter"class="card w-5/12 bg-sky-200 p-4">
                    <h3 class="text-lg font-semibold mb-4">
                        <font-awesome-icon :icon="['fas', singleData.icon]" />
                        Hai {{ singleData.number }} 
                        <span v-if="singleData.number == 1">{{ singleData.singularName }}</span>
                        <span v-else>{{ singleData.pluralName }}</span>.
                    </h3>

                    <router-link :to="singleData.path" class="btn btn-warning self-start">
                        <font-awesome-icon :icon="['fas', 'door-open']" />

                        <span>Vai alla pagina</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>