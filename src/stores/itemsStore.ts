import { defineStore } from "pinia";
import { ItemSchema, PageSchema } from "../models";
import { ref } from "vue";
import { ApiInstance } from "../api";

export const useItemsStore = defineStore("itemsStore", () => {
    const inited = ref<boolean>(false);
    const hotItems = ref<ItemSchema[]>([]);
    const bestItems = ref<ItemSchema[]>([]);
    const likedItems = ref<ItemSchema[]>([]);
    const itemsData = ref<ItemSchema[]>([]);
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const fetchHotItems = async () => {
        const apiInstance = new ApiInstance();
        hotItems.value = await apiInstance.get("/general/items/hot");
    }
    const fetchBestItems = async () => {
        const apiInstance = new ApiInstance();
        bestItems.value = await apiInstance.get("/general/items/best");
    }
    const fetchLikedItems = async () => {
        const apiInstance = new ApiInstance();
        likedItems.value = await apiInstance.get("/general/items/liked");
    }
    const fetchItemsData = async () => {
        const apiInstance = new ApiInstance();
        if (page.value < pages.value) {
            const paginatedData: PageSchema<ItemSchema> = await apiInstance.get("/general/items", { page: page.value });
            itemsData.value.push(...paginatedData.data);
            pages.value = paginatedData.pages;
            ++page.value;
        }
    }
    const resetAll = () => {
        inited.value = false;
        hotItems.value = [];
        bestItems.value = [];
        likedItems.value = [];
        itemsData.value = [];
    }
    return { inited, hotItems, bestItems, likedItems, itemsData, fetchHotItems, fetchBestItems, fetchLikedItems, fetchItemsData, resetAll };
});