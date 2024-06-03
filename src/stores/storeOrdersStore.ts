import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FullOrderSchema, PageSchema } from "../models";
import { ApiInstance } from "../api/apiInstance";

export const useStoreOrdersStore = defineStore("storeOrdersStore", () => {
    const data = ref<FullOrderSchema[]>([]);
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const reset = () => {
        data.value = [];
        page.value = 1;
        pages.value = Infinity;
    }
    const canLoadMore = computed<boolean>(() => {
        return page.value >= 1 && page.value <= pages.value;
    })
    const loadMore = async () => {
        if (canLoadMore.value === true) {
            const apiInstance = new ApiInstance();
            try {
                const paginatedData: PageSchema<FullOrderSchema> = await apiInstance.get("/user/store/orders", { page: page.value, size: 20 });
                data.value.push(...paginatedData.items);
                pages.value = paginatedData.pages;
                page.value++;
            }
            catch (err) {
                throw err;
            }
        }
    }
    return { data, pages, canLoadMore, loadMore, reset };
})