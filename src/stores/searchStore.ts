import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { ApiInstance } from "../api/apiInstance";
import { FullItemSchema, ItemQuerySchema, PageSchema } from "../models";

export const useSearchStore = defineStore("searchStore", () => {
    const searchNow = ref<boolean>(false);
    const page = ref<number>(1);
    const pages = ref<number>(Infinity);
    const query = ref<ItemQuerySchema>({});
    const items = ref<FullItemSchema[]>([]);
    const canLoadMore = computed(() => page.value <= pages.value);
    const loadMore = async () => {
        const apiInstance = new ApiInstance();
        try {
            const fetchedData: PageSchema<FullItemSchema> = await apiInstance.get("/general/items", { query: query.value, page: page.value, size: 60 });
            page.value = fetchedData.page;
            pages.value = fetchedData.page;
            items.value.push(...fetchedData.items);
        }
        catch (err) {
            throw err;
        }
    }
    const resetAll = () => {
        page.value = 1;
        pages.value = Infinity;
        query.value = {};
        items.value = [];
    }
    return { page, pages, query, items, canLoadMore, loadMore, resetAll, searchNow };
});