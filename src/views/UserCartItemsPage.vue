<script setup lang="ts">
import { useUserCartItemsStore } from '../stores/userCartItemsStore';
import { useAsyncState } from '@vueuse/core';
import { computed, ref } from 'vue';
import CartItemRow from '../components/CartItemRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { CartItemSchema } from '../models';

const loader = ref();
const userCartItemsStore = useUserCartItemsStore();

const fetchState = useAsyncState(() => userCartItemsStore.fetchCartItems(), undefined, { immediate: false });

//useInfiniteScroll(loader, () => fetchState.execute(), { canLoadMore: () => { return userCartItemsStore.canLoadMore && !fetchState.isLoading.value }, interval: 1000 });

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
        total += (cartItem.item.price * cartItem.count);
    });
    return total;
});
</script>

<template>
    <LoginCheck>
        <div class="container bg-light" ref="loader">
            <div class="d-flex flex-row flex-fill">
                <input class="form-check-input me-2" type="checkbox">
                <label class="form-label">全選</label>
            </div>
            <CartItemRow v-for="cartItem in userCartItemsStore.cartItemsData" :key="cartItem.item_id" :cart-item="cartItem" @checked-changed="selectedItemsOnChange(cartItem)" />
            <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                <template #loading>
                    <h3 class="text-center">讀取中。。。</h3>
                </template>
            </TriState>
        </div>
        <div class="container fixed-bottom">
            <div class="d-flex flex-row bg-light">
                <h5 class="text-start mt-3 align-self-begin">總價：${{ totalPrice }}</h5>
                <div class="d-flex flex-row flex-fill justify-content-end">
                    <button class="btn btn-danger align-end">點我送出訂單</button>
                </div>
            </div>
        </div>
    </LoginCheck>
</template>