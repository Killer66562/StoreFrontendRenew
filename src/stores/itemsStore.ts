import { defineStore } from "pinia";
import { FullItemSchema, PageSchema } from "../models";
import { computed, ref } from "vue";
import { ApiInstance } from "../api";

export const useItemsStore = defineStore("itemsStore", () => {
    const inited = ref<boolean>(false);
    const hotItems = ref<FullItemSchema[]>([]);
    const bestItems = ref<FullItemSchema[]>([]);
    const likedItems = ref<FullItemSchema[]>([]);
    const itemsData = ref<FullItemSchema[]>([]);
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const canLoadMore = computed<boolean>(() => {
        return page.value <= pages.value;
    })
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
        if (canLoadMore.value === true) {
            const paginatedData: PageSchema<FullItemSchema> = await apiInstance.get("/general/items", { page: page.value });
            itemsData.value.push(...paginatedData.items);
            pages.value = paginatedData.pages;
            ++page.value;
        }
    }
    const resetAll = () => {
        page.value = 1;
        pages.value = Infinity;
        inited.value = false;
        hotItems.value = [];
        bestItems.value = [];
        likedItems.value = [];
        itemsData.value = [];
    }
    return { inited, hotItems, bestItems, likedItems, itemsData, fetchHotItems, fetchBestItems, fetchLikedItems, fetchItemsData, resetAll, canLoadMore };
});