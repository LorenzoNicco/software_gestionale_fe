//Store
import { store } from '../store.js';

export function useCloseNotification(argId) {
    //Cerco la notifica target nella lista e la elimino
    let newArray = store.notificationsList.filter((singleNotification) => singleNotification.id != argId);
    store.notificationsList = newArray;
}