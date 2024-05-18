<script setup lang="ts">
import { useUserLikedItemsStore } from '../stores/userLikedItemsStore';
import { useInfiniteScroll, useAsyncState } from '@vueuse/core';
import { ref } from 'vue';
import LikedItemRow from '../components/LikedItemRow.vue';
import TriState from '../components/TriState.vue';

const loader = ref();
const userLikedItemsStore = useUserLikedItemsStore();

const fetchState = useAsyncState(() => userLikedItemsStore.fetchLikedItems(), undefined, { immediate: false });

useInfiniteScroll(loader, () => fetchState.execute(), { canLoadMore: () => { return userLikedItemsStore.canLoadMore && !fetchState.isLoading.value }, interval: 1000 });
</script>

<template>
    <div class="container" ref="loader">
        <LikedItemRow v-for="likedItem in userLikedItemsStore.likedItemsData" :key="likedItem.id" :liked-item="likedItem" />
        <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
            <template #loading>
                <h3 class="text-center">讀取中。。。</h3>
            </template>
        </TriState>
    </div>
</template>