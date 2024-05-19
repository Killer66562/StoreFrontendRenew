import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { OrderSchema, PageSchema } from "../models";
import { ApiInstance } from "../api";

export const userOrdersStore = defineStore("userOrdersStore", () => {
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const canLoadMore = computed<boolean>(() => page.value <= pages.value);
    const orderItemsData = ref<OrderSchema[]>([]);
    const fetchLikedItems = async () => {
        if (canLoadMore.value) {
            const apiInstance = new ApiInstance();
            const fetchedData: PageSchema<OrderSchema> = await apiInstance.get("/user/orders", { page: page.value });
            orderItemsData.value.push(...fetchedData.items);
            ++page.value;
            pages.value = fetchedData.pages;
        }
    }
    const reset = () => {
        page.value = 1;
        pages.value = Infinity;
        orderItemsData.value = [];
    }
    return { page, pages, canLoadMore, fetchLikedItems, reset, orderItemsData };
});