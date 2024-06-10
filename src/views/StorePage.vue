<script setup lang="ts">
import InitCheck from '../components/InitCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import { ApiInstance } from '../api/apiInstance';
import { computed, ref } from 'vue';
import { FullItemSchema, FullStoreSchema, ItemQuerySchema, OptionValueText, PageSchema } from '../models';
import { router } from '../routes';
import ItemCardAll from '../components/ItemCardAll.vue';
import { useAsyncState } from '@vueuse/core';
import OrderByRow from '../components/OrderByRow.vue';
import TriState from '../components/TriState.vue';

const opts: OptionValueText[] = [
    { value: undefined, text: "預設" },
    { value: "name", text: "商品名稱" },
    { value: "price", text: "價格" },
    { value: "hottest", text: "最熱銷" },
    { value: "best", text: "評分最高" }
];

const store = ref<FullStoreSchema>();

const fetchStore = async () => {
    const apiInstance = new ApiInstance();
    try {
        store.value = await apiInstance.get(`/general/stores/${router.currentRoute.value.params.storeId}`);
    }
    catch (err) {
        throw err;
    }
}

const data = ref<FullItemSchema[]>([]);
const page = ref<number>(1);
const pages = ref<number>(Infinity);
const total = ref<number | undefined>(0);
const canLoadMore = computed(() => page.value <= pages.value);

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
            const paginatedData: PageSchema<FullItemSchema> = 
                await apiInstance.get(`/general/stores/${router.currentRoute.value.params.storeId}/items`, { page: page.value, size: 60, ...query.value });
            pages.value = paginatedData.pages;
            page.value++;
            data.value.push(...paginatedData.items);
            total.value = paginatedData.total;
        }
        catch (err) {
            throw err;
        }
    }
}

const query = ref<ItemQuerySchema>({
    desc: false,
    need18: false
});

const fetchState = useAsyncState(() => fetchStore(), undefined, { immediate: false });
const searchState = useAsyncState(() => loadMore(), undefined, { immediate: false });

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

const need18Changed = async (need18: boolean) => {
    query.value.need18 = need18;
    await anythingOnChanged();
}

fetchState.execute();
</script>

<template>
    <InitCheck>
        <template #ready>
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #ready>
                    <StoreInfo :store="store" />
                    <div class="input-group mb-3">
                        <span class="input-group-text">在商店中尋找</span>
                        <input type="text" class="form-control" placeholder="查詢您心愛的商品，找好貨。" v-model="query.name">
                        <button class="btn btn-success" type="button" @click="anythingOnChanged" :disabled="searchState.isLoading.value">GO</button>
                    </div>
                    <OrderByRow :opts="opts" :query="query" @desc-changed="descChanged" @order-by-changed="orderByChanged" @need18-changed="need18Changed"/>
                    <ItemCardAll :items="data" :can-load-more="canLoadMore" :loading="searchState.isLoading.value" :ready="searchState.isReady.value" :error="searchState.error.value" @load-more="searchState.execute" />
                </template>
            </TriState>
        </template>
    </InitCheck>
</template>