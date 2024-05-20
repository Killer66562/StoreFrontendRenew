import { defineStore } from "pinia";
import { ref } from "vue";
import { CartItemSchema } from "../models";
import { ApiInstance } from "../api";

export const useUserCartItemsStore = defineStore("userCartItemsStore", () => {
    const cartItemsData = ref<CartItemSchema[]>([]);
    const fetchCartItems = async () => {
        const apiInstance = new ApiInstance();
        cartItemsData.value = await apiInstance.get("/user/cart_items");
    }
    const reset = () => {
        cartItemsData.value = [];
    }
    return { cartItemsData, fetchCartItems, reset };
});