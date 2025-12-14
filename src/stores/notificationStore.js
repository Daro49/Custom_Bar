/**
* File:     notificationStore.js
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Pop-up for informing user store
*/

import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification' , {

    state: () => ({
        message: '',
        type: 'warning',
        isVisible: false,
        timeout: null,
    }),

    actions: {
        showNotification(message, type) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.message = message || 'Unexpected action';
            this.type = type || 'warning';
            this.isVisible = true;

            this.timeout = setTimeout(() => {
                this.hideNotification();
            }, 3000)
        },

        hideNotification() {
            this.isVisible = false;
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        }
    }
})