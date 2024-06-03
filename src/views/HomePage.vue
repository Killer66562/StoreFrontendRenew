<script setup lang="ts">
import { useItemsStore } from '../stores/itemsStore';
import ItemCardRow from '../components/ItemCardRow.vue';
import { useAsyncState } from '@vueuse/core';
import InitCheck from '../components/InitCheck.vue';
import ItemCardAll from '../components/ItemCardAll.vue';
import { onUnmounted } from 'vue';

const itemsStore = useItemsStore();

const fetchState = useAsyncState(() => itemsStore.fetchItemsData(), undefined, { immediate: false })

onUnmounted(() => itemsStore.resetFetchedData());
</script>

<template>
    <h2>熱銷商品</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.hotItems" /></template>
    </InitCheck>
    <h2>精選好物</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.bestItems" /></template>
    </InitCheck>
    <h2>你可能會喜歡</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.likedItems" /></template>
    </InitCheck>
    <h2>商品一覽</h2>
    <InitCheck>
        <template #ready>
            <ItemCardAll :items="itemsStore.itemsData" :can-load-more="itemsStore.canLoadMore" :error="fetchState.error.value" :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" @load-more="fetchState.execute" />
        </template>
    </InitCheck>
</template>