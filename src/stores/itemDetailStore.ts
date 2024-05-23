import { defineStore } from "pinia";
import { ref } from "vue";
import { CUItemSchema, ItemSchema } from "../models";
import { ApiInstance, baseConfig } from "../api";

export const useItemDetailStore = defineStore("itemDetailStore", () => {
    const editableData = ref<CUItemSchema>();
    const itemDetail = ref<ItemSchema>();
    const fetchItemDetail = async (itemId?: number) => {
        if (itemId === undefined)
            throw new Error();
        else {
            resetItemDetail();
            const apiInstance = new ApiInstance(baseConfig);
            try {
                itemDetail.value = await apiInstance.get("/items");
            }
            catch (err) {
                throw err;
            }
            finally {
                if (itemDetail.value === undefined) {
                    editableData.value = {
                        name: "",
                        introduction: "",
                        price: 0,
                        count: 1,
                        icon: null,
                        need_18: false
                    }
                }
                else {
                    editableData.value = {...itemDetail.value, icon: null };
                }
            }
        }
    }
    const resetItemDetail = async () => {
        editableData.value = undefined;
        itemDetail.value = undefined;
    }
    const sendEditableData = async () => {
        const apiInstance = new ApiInstance(baseConfig);
        if (editableData.value === undefined)
            throw new Error();
        else {
            await apiInstance.put(`/user/store/items/${itemDetail.value?.id}`, editableData.value);
            await fetchItemDetail();
        }
    }
    return { editableData, itemDetail, resetItemDetail, fetchItemDetail, sendEditableData }
});