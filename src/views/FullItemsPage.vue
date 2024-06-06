<script setup lang="ts">
import ItemCardAll from '../components/ItemCardAll.vue';
import { useSearchStore } from '../stores/searchStore';
import InitCheck from '../components/InitCheck.vue';
import { computed, ref, watch } from 'vue';
import { FullItemSchema, OptionValueText, PageSchema } from '../models';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import OrderByRow from '../components/OrderByRow.vue'

const opts: OptionValueText[] = [
    { value: undefined, text: "預設" },
    { value: "name", text: "商品名稱" },
    { value: "store_id", text: "商店" },
    { value: "hottest", text: "最熱銷" },
    { value: "best", text: "評分最高" }
];

const searchStore = useSearchStore();

const page = ref<number>(1);
const pages = ref<number>(Infinity);
const total = ref<number | undefined>(0);
const canLoadMore = computed(() => page.value <= pages.value);

const { searchNow, query } = storeToRefs(searchStore);

const data = ref<FullItemSchema[]>([]);

const resetAll = () => {
    page.value = 1;
    pages.value = Infinity;
    data.value = [];
    total.value = 0;
}

const loadMore = async () => {
    if (canLoadMore.value === true) {
        const apiInstance = new ApiInstance();
        try {
            const paginatedData: PageSchema<FullItemSchema> = await apiInstance.get("/general/items", { page: page.value, size: 60, ...query.value });
            pages.value = paginatedData.pages;
            page.value++;
            data.value.push(...paginatedData.items);
            total.value = paginatedData.total;
        }
        catch (err) {
            throw err;
        }
        finally {
            searchNow.value = false;
        }
    }
}

const searchState = useAsyncState(() => loadMore(), undefined, { immediate: false });

watch(searchNow, async () => {
    if (searchNow.value === true) {
        resetAll();
        await searchState.execute(500);
    }
});

const anythingOnChanged = async () => {
    resetAll();
    await searchState.execute(500);
}

const orderByChanged = async (orderBy: any) => {
    query.value.order_by = orderBy;
    await anythingOnChanged();
}

const descChanged = async (desc: boolean) => {
    query.value.desc = desc;
    await anythingOnChanged();
}
</script>

<template>
    <InitCheck>
        <template #ready>
            <h2 class="text-center">全站搜尋</h2>
            <OrderByRow :query="searchStore.query" :opts="opts" @desc-changed="descChanged" :on-need18-changed="anythingOnChanged" @order-by-changed="orderByChanged"/>
            <ItemCardAll :paused="searchNow" :items="data" :can-load-more="canLoadMore" :loading="searchState.isLoading.value" :ready="searchState.isReady.value" :error="searchState.error.value" @load-more="searchState.execute" />
        </template>
    </InitCheck>
</template>