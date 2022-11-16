import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: []
    }),

    getters: {},

    actions: {
        addItem(){},
        removeItem(){},
        reset(){}
    }
})