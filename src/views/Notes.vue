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
    <div class="about">
        <div class="w-full p-4 rounded-xl bg-orange-300 shadow-md mb-4">
            <h1 class="text-4xl font-bold">Note</h1>
        </div>

        <div class="w-full rounded-xl">
            <ul>
                <li v-for="singleNote in notesData" class="collapse collapse-arrow shadow-md">
                    <input type="radio" name="my-accordion-2" checked="checked" /> 

                    <div class="collapse-title text-xl font-medium">{{ singleNote.title }}</div>

                    <div class="collapse-content flex justify-between"> 
                        <p>{{ singleNote.noteBody }}</p>

                        <div>
                            <button class="btn btn-warning btn-sm btn-square">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </button>
                            
                            <button class="btn btn-error btn-sm btn-square ms-2">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>