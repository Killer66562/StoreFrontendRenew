<script setup lang="ts">
import { useUserCartItemsStore } from '../stores/userCartItemsStore';
import { useInfiniteScroll, useAsyncState } from '@vueuse/core';
import { ref } from 'vue';
import CartItemRow from '../components/CartItemRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';

const loader = ref();
const userCartItemsStore = useUserCartItemsStore();

const fetchState = useAsyncState(() => userCartItemsStore.fetchLikedItems(), undefined, { immediate: false });

useInfiniteScroll(loader, () => fetchState.execute(), { canLoadMore: () => { return userCartItemsStore.canLoadMore && !fetchState.isLoading.value }, interval: 1000 });

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <div class="container" ref="loader">
            <CartItemRow v-for="cartItem in userCartItemsStore.cartItemsData" :key="cartItem.item_id" :cart-item="cartItem" />
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #loading>
                    <h3 class="text-center">讀取中。。。</h3>
                </template>
            </TriState>
        </div>
    </LoginCheck>
</template>