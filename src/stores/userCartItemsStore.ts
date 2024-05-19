import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CartItemSchema, PageSchema } from "../models";
import { ApiInstance } from "../api";

export const useUserCartItemsStore = defineStore("userCartItemsStore", () => {
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const canLoadMore = computed<boolean>(() => page.value <= pages.value);
    const cartItemsData = ref<CartItemSchema[]>([]);
    const fetchLikedItems = async () => {
        if (canLoadMore.value) {
            const apiInstance = new ApiInstance();
            const fetchedData: PageSchema<CartItemSchema> = await apiInstance.get("/user/cart_items", { page: page.value });
            cartItemsData.value.push(...fetchedData.items);
            ++page.value;
            pages.value = fetchedData.pages;
        }
    }
    const reset = () => {
        page.value = 1;
        pages.value = Infinity;
        cartItemsData.value = [];
    }
    return { page, pages, canLoadMore, fetchLikedItems, reset, cartItemsData };
});