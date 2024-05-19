<script setup lang="ts">
import { useUserCartItemsStore } from '../stores/userCartItemsStore';
import { useInfiniteScroll, useAsyncState } from '@vueuse/core';
import { computed, ref } from 'vue';
import CartItemRow from '../components/CartItemRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';
import { CartItemSchema } from '../models';

const loader = ref();
const userCartItemsStore = useUserCartItemsStore();

const fetchState = useAsyncState(() => userCartItemsStore.fetchLikedItems(), undefined, { immediate: false });

useInfiniteScroll(loader, () => fetchState.execute(), { canLoadMore: () => { return userCartItemsStore.canLoadMore && !fetchState.isLoading.value }, interval: 1000 });

const onNotLogin = async () => {
    await router.replace("/login");
}

const selectedItems = ref<CartItemSchema[]>([]);

const selectedItemsOnChange = (cItem: CartItemSchema) => {
    const idx = selectedItems.value.findIndex((cartItem) => cartItem.id == cItem.id);
    if (idx > -1)
        selectedItems.value.splice(idx);
    else
        selectedItems.value.push(cItem);
}

const totalPrice = computed<number>(() => {
    let total = 0;
    selectedItems.value.forEach((cartItem) => {
        total += cartItem.item.price;
    });
    return total;
});
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <div class="container" ref="loader">
            <CartItemRow v-for="cartItem in userCartItemsStore.cartItemsData" :key="cartItem.item_id" :cart-item="cartItem" @checked-changed="selectedItemsOnChange(cartItem)" />
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #loading>
                    <h3 class="text-center">讀取中。。。</h3>
                </template>
            </TriState>
        </div>
        <h5 class="mt-3">總價：${{ totalPrice }}</h5>
    </LoginCheck>
</template>