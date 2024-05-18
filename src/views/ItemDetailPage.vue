<script setup lang="ts">
import { FullItemSchema } from '../models';
import { router } from '../routes';
import ItemInfo from '../components/ItemInfo.vue';
import TriState from '../components/TriState.vue';
import { ref } from 'vue';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';
import StoreInfo from '../components/StoreInfo.vue';
import CommentBoard from '../components/CommentBoard.vue';

const item = ref<FullItemSchema>();

const fetchItem = async () => {
    if (router.currentRoute.value.params.itemId) {
        const apiInstance = new ApiInstance();
        item.value = await apiInstance.get(`/general/items/${router.currentRoute.value.params.itemId}`);
    }
}

const fetchState = useAsyncState(() => fetchItem(), undefined, { immediate: false });

fetchState.execute();
</script>

<template>
    <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
        <template #loading>
            <h3 class="text-center">載入中。。。</h3>
        </template>
        <template #ready>
            <template v-if="item">
                <ItemInfo :item="item"/>
                <StoreInfo :store="item.store" />
                <CommentBoard :comments="item.comments" :item="item" />
            </template>
            <h3 class="text-center" v-else>商品不存在</h3>
        </template>
        <template #error>
            <h3 class="text-center">商品不存在</h3>
        </template>
    </TriState>
</template>