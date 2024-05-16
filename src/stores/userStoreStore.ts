import { defineStore } from "pinia";
import { ref } from "vue";
import { CUStoreSchema, StoreSchema } from "../models";
import { ApiInstance } from "../api";

export const useUserStoreStore = defineStore("userStore", () => {
    const userStoreData = ref<StoreSchema>();
    const fetchData = async () => {
        const apiInstance = new ApiInstance();
        userStoreData.value = await apiInstance.get("/user/store");
    }
    const resetData = () => {
        userStoreData.value = undefined;
    }
    const createStore = async (data: CUStoreSchema, icon: File | null) => {
        const apiInstance = new ApiInstance();
        await apiInstance.post("/user/store", data);
        if (icon !== null) {
            try {
                await apiInstance.putForm("/user/store/icon", icon);
            }
            catch (err) {}
        }
        try {
            await fetchData();
        }
        catch (err) {}
    }
    return { userStoreData, fetchData, resetData, createStore }
});