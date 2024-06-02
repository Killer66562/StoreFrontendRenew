import { defineStore } from "pinia";
import { ref } from "vue";
import { CIOrderSchema, CUOrderSchema, CartItemSchema } from "../models";
import { ApiInstance } from "../api/apiInstance";

export const useUserCreateOrdersStore = defineStore("userCreateOrdersStore", () => {
    const orders = ref<CIOrderSchema[]>([]);
    const generateOrders = (cartItems: CartItemSchema[]) => {
        resetOrders();
        cartItems.forEach((cartItem) => {
            orders.value.push({ cartItem: cartItem, order: { count: cartItem.count, item_id: cartItem.item.id, address: "", note: null } });
        });
    }
    const resetOrders = () => {
        orders.value = [];
    }
    const sendOrders = async () => {
        const apiInstance = new ApiInstance();
        const realOrders: CUOrderSchema[] = [];
        orders.value.forEach((realOrder) => {
            if (realOrder.order.note?.length == 0)
                realOrder.order.note = null;
            realOrders.push(realOrder.order);
        });
        try {
            await apiInstance.post("/user/orders", realOrders);
            resetOrders();
        }
        catch (err) {
            throw err;
        }
    }
    return { orders, generateOrders, resetOrders, sendOrders };
});