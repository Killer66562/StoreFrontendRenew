<script setup lang="ts">
import { useUserLikedItemsStore } from '../stores/userLikedItemsStore';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';
import LikedItemRow from '../components/LikedItemRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';

const loader = ref();

const fetchState = useAsyncState(() => userLikedItemsStore.fetchLikedItems(), undefined, { immediate: false });

const userLikedItemsStore = useUserLikedItemsStore();
</script>

<template>
    <LoginCheck>
        <div class="container" ref="loader">
            <LikedItemRow v-for="likedItem in userLikedItemsStore.likedItemsData" :key="likedItem.id" :liked-item="likedItem" />
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #loading>
                    <h3 class="text-center">讀取中。。。</h3>
                </template>
            </TriState>
        </div>
    </LoginCheck>
</template>