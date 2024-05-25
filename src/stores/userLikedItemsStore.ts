import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FullLikedItemSchema, PageSchema } from "../models";
import { ApiInstance } from '../api/apiInstance';

export const useUserLikedItemsStore = defineStore("userLikedItemsStore", () => {
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const canLoadMore = computed<boolean>(() => page.value <= pages.value);
    const likedItemsData = ref<FullLikedItemSchema[]>([]);
    const fetchLikedItems = async () => {
        if (canLoadMore.value) {
            const apiInstance = new ApiInstance();
            const fetchedData: PageSchema<FullLikedItemSchema> = await apiInstance.get("/user/liked_items", { page: page.value });
            likedItemsData.value.push(...fetchedData.items);
            ++page.value;
            pages.value = fetchedData.pages;
        }
    }
    const resetPage = () => {
        page.value = 1;
        pages.value = Infinity;
    }
    const reset = () => {
        resetPage();
        likedItemsData.value = [];
    }
    return { page, pages, canLoadMore, fetchLikedItems, reset, resetPage, likedItemsData };
});