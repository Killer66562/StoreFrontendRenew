<script setup lang="ts">
import { useInfiniteScroll, useAsyncState } from '@vueuse/core';
import { userOrdersStore } from '../stores/userOrdersStore';
import { ref } from 'vue';
import orderRow from '../components/OrderRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';

const loader = ref();
const useUserOrdersStore = userOrdersStore();

const fetchState = useAsyncState(() => useUserOrdersStore.fetchLikedItems(), undefined, { immediate: false });

useInfiniteScroll(loader, () => fetchState.execute(), { canLoadMore: () => { return useUserOrdersStore.canLoadMore && !fetchState.isLoading.value }, interval: 1000 });

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <div class="container" ref="loader">
            <orderRow v-for="cartItem in useUserOrdersStore.orderItemsData" :key="cartItem.id" :orderedItem="cartItem" />
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #loading>
                    <h3 class="text-center">讀取中。。。</h3>
                </template>
            </TriState>
        </div>
    </LoginCheck>
</template>