import { defineStore } from "pinia";
import { ref } from "vue";
import { CUStoreSchema, StoreSchema } from "../models";
import { ApiInstance, baseConfig } from "../api";

export const useUserStoreStore = defineStore("userStore", () => {
    const editableData = ref<CUStoreSchema>();
    const userStore = ref<StoreSchema>();
    const fetchUserStore = async () => {
        resetUserStore();
        const apiInstance = new ApiInstance(baseConfig);
        try {
            userStore.value = await apiInstance.get("/user/store");
        }
        catch (err) {
            throw err;
        }
        finally {
            if (userStore.value === undefined) {
                editableData.value = {
                    name: "",
                    introduction: ""
                }
            }
            else {
                editableData.value = {...userStore.value};
            }
        }
    }
    const resetUserStore = async () => {
        editableData.value = undefined;
        userStore.value = undefined;
    }
    const sendEditableData = async () => {
        const apiInstance = new ApiInstance(baseConfig);
        if (editableData.value === undefined)
            throw new Error();
        else {
            await apiInstance.put("/user/store", editableData.value);
            await fetchUserStore();
        }
    }
    return { editableData, userStore, fetchUserStore, resetUserStore, sendEditableData }
});