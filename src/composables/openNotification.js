import { useCloseNotification } from "./closeNotification.js";

//Store
import { store } from '../store.js';

export function useOpenNotification(notification) {
    //Aggiungo una notifica alla lista
    store.notificationsList.push(notification);

    //Elimino la notifica dopo tre secondi
    setTimeout(useCloseNotification.bind(null, notification.id), 3000);
}