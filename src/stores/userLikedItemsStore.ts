import { defineStore } from "pinia";
import {  ref } from "vue";
import { FullLikedItemSchema } from "../models";
import { ApiInstance } from '../api/apiInstance';

export const useUserLikedItemsStore = defineStore("userLikedItemsStore", () => {
    const likedItemsData = ref<FullLikedItemSchema[]>([]);
    const fetchLikedItems = async () => {
        const apiInstance = new ApiInstance();
        likedItemsData.value = await apiInstance.get("/user/liked_items");
    }
    const reset = () => {
        likedItemsData.value = [];
    }
    return { fetchLikedItems, reset, likedItemsData };
});