<script setup lang="ts">
import ItemCardAll from '../components/ItemCardAll.vue';
import { useSearchStore } from '../stores/searchStore';
import InitCheck from '../components/InitCheck.vue';
import { computed, ref, watch } from 'vue';
import { FullItemSchema, PageSchema } from '../models';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore();

const page = ref<number>(1);
const pages = ref<number>(Infinity);
const total = ref<number | undefined>(0);
const canLoadMore = computed(() => page.value <= pages.value);

const { searchNow } = storeToRefs(searchStore);

const data = ref<FullItemSchema[]>([]);

const resetAll = () => {
    page.value = 1;
    pages.value = Infinity;
    data.value = [];
    total.value = 0;
}

const loadMore = async () => {
    const apiInstance = new ApiInstance();
    try {
        const paginatedData: PageSchema<FullItemSchema> = await apiInstance.get("/general/items", { page: page.value, size: 60, ...searchStore.query });
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

const searchState = useAsyncState(() => loadMore(), undefined, { immediate: false });

watch(searchNow, async () => {
    if (searchNow.value === true) {
        resetAll();
        await searchState.execute();
    }
})
</script>

<template>
    <InitCheck>
        <template #ready>
            <div class="d-flex flex-row justify-content-end mb-3">
                <div class="me-3">
                    <label class="form-label">倒序</label>
                    <input type="checkbox" class="form-check-input" v-model="searchStore.query.desc">
                </div>
                <div class="me-3">
                    <label class="form-label">顯示18禁商品</label>
                    <input type="checkbox" class="form-check-input">
                </div>
                <div class="me-3">
                    <label class="form-label">排序方式</label>
                </div>
                <div>
                    <select class="form-select" v-model="searchStore.query.order_by">
                        <option selected :value="undefined">預設</option>
                        <option value="name">商品名稱</option>
                        <option value="store_id">商店</option>
                        <option value="hottest">最熱銷</option>
                        <option value="best">評分最高</option>
                    </select>
                </div>
            </div>
            <ItemCardAll :paused="searchNow" :items="data" :can-load-more="canLoadMore" :loading="searchState.isLoading.value" :ready="searchState.isReady.value" :error="searchState.error.value" @load-more="searchState.execute" />
        </template>
    </InitCheck>
</template>