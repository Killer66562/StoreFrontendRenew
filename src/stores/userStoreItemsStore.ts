import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FullItemSchema, PageSchema } from "../models";
import { ApiInstance } from "../api/apiInstance";

export const useUserStoreItemsStore = defineStore("userStoreItemsStore", () => {
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const canLoadMore = computed<boolean>(() => page.value <= pages.value);
    const itemsData = ref<FullItemSchema[]>([]);
    const reset = () => {
        page.value = 1;
        pages.value = Infinity;
        itemsData.value = [];
    }
    const fetchItemsData = async () => {
        const apiInstance = new ApiInstance();
        try {
            const fetchedData: PageSchema<FullItemSchema> = await apiInstance.get("/user/store/items", { page: page.value, size: 60 });
            console.log(fetchedData);
            itemsData.value.push(...fetchedData.items);
            pages.value = fetchedData.pages;
            page.value++;
        }
        catch (err) {
            throw err;
        }
    }
    return { page, pages, itemsData, reset, fetchItemsData, canLoadMore };
});