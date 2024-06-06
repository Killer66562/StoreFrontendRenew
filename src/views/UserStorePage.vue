<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import TriState from '../components/TriState.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
import { useRootStore } from '../stores/rootStore';
import ItemCardAll from '../components/ItemCardAll.vue';
import { useAsyncState } from '@vueuse/core';
import OrderByRow from '../components/OrderByRow.vue';
import { FullItemSchema, ItemQuerySchema, OptionValueText, PageSchema } from '../models';
import { computed, ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';

const rootStore = useRootStore();
const userStoreStore = useUserStoreStore();

const opts: OptionValueText[] = [
    { value: undefined, text: "預設" },
    { value: "name", text: "商品名稱" },
    { value: "price", text: "價格" },
    { value: "hottest", text: "最熱銷" },
    { value: "best", text: "評分最高" }
];

const loadMore = async () => {
    if (canLoadMore.value === true) {
        const apiInstance = new ApiInstance();
        try {
            const paginatedData: PageSchema<FullItemSchema> = await apiInstance.get("/user/store/items", { page: page.value, size: 60, ...query.value });
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

const data = ref<FullItemSchema[]>([]);
const page = ref<number>(1);
const pages = ref<number>(Infinity);
const total = ref<number | undefined>(0);
const canLoadMore = computed(() => page.value <= pages.value);

const query = ref<ItemQuerySchema>({
    desc: false,
    need18: false
});

const resetAll = () => {
    page.value = 1;
    pages.value = Infinity;
    data.value = [];
    total.value = 0;
}

const anythingOnChanged = async () => {
    resetAll();
    await fetchState.execute(500);
}

const orderByChanged = async (orderBy: any) => {
    query.value.order_by = orderBy;
    await anythingOnChanged();
}

const descChanged = async (desc: boolean) => {
    query.value.desc = desc;
    await anythingOnChanged();
}

const fetchState = useAsyncState(() => loadMore(), undefined, { immediate: false });
</script>

<template>
    <LoginCheck>
        <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
            <template #loading>
                <h2 class="text-center">讀取中。。。</h2>
            </template>
            <template #ready>
                <template v-if="userStoreStore.userStoreData">
                    <StoreInfo :store="userStoreStore.userStoreData" />
                    <div class="mb-3">
                        <RouterLink to="/user/create-item">點我上架新商品</RouterLink>                    
                    </div>
                    <div class="mb-3">
                        <RouterLink to="/user/store-orders">查看訂單</RouterLink>
                    </div>
                    <OrderByRow :opts="opts" @desc-changed="descChanged" @name-changed="" @order-by-changed="orderByChanged" @need18-changed="" :query="query"></OrderByRow>
                    <ItemCardAll :items="data" :loading="fetchState.isLoading.value" :error="fetchState.error.value" :ready="fetchState.isReady.value" :canLoadMore="canLoadMore" @loadMore="fetchState.execute" />
                </template>
                <template v-else>
                    <h2 class="text-center">你還沒有建立自己的拍賣小舖喔</h2>
                    <div class="text-center" >
                        <RouterLink to="/user/create-store">點我建立</RouterLink>
                    </div>
                </template>
            </template>
            <template #error>
                <h2 class="text-center">讀取失敗。</h2>
            </template>
        </TriState>
        <template #notLogin></template>
    </LoginCheck>
</template>