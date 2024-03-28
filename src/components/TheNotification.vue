<script>
//Store
import { store } from '../store.js';

//Composables
import { useCloseNotification } from '../composables/closeNotification.js';

export default {
    name: 'TheNotification',
    data() {
        return {
            store,
            closeNotification: useCloseNotification
        }
    }
}
</script>

<template>
    <div class="notification-container">
        <div v-for="notification in store.notificationsList" class="container">
            <div class="rounded-md flex flex-col" :class="notification.bgType">
                <div class="flex justify-between pt-4 px-4 pb-2">
                    <p class="notification__text">{{ notification.message }}</p>
    
                    <button class="close" v-on:click="closeNotification(notification.id)">
                        &times;
                    </button>
                </div>

                <progress class="progress w-full"></progress>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notification-container {
    position: fixed;
    top: 10%;
    right: 2%;
    width: 400px;
    z-index: 999;
    color: white;
}
</style>