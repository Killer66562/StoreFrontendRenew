import { defineStore } from "pinia";
import { ref } from "vue";
import { OrderSchema } from "../models";
import { ApiInstance } from '../api/apiInstance';

export const useUserOrdersStore = defineStore("userOrdersStore", () => {
    const orderItemsData = ref<OrderSchema[]>([]);
    const fetchOrders = async () => {
        const apiInstance = new ApiInstance();
        orderItemsData.value = await apiInstance.get("/user/orders");
    }
    const reset = () => {
        orderItemsData.value = [];
    }
    return { fetchOrders, reset, orderItemsData };
});