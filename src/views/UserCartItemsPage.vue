<script setup lang="ts">
import { useUserCartItemsStore } from '../stores/userCartItemsStore';
import { useAsyncState } from '@vueuse/core';
import { computed, ref } from 'vue';
import CartItemRow from '../components/CartItemRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { CartItemSchema } from '../models';
import { useUserCreateOrdersStore } from '../stores/userCreateOrdersStore';
import { router } from '../routes';
import { useToast } from 'vue-toast-notification';

const loader = ref();
const userCartItemsStore = useUserCartItemsStore();
const userCreateOrdersStore = useUserCreateOrdersStore();

const fetchState = useAsyncState(() => userCartItemsStore.fetchCartItems(), undefined, { immediate: false });

const selectedItems = ref<CartItemSchema[]>([]);

const selectedItemsOnChange = (cItem: CartItemSchema) => {
    const idx = selectedItems.value.findIndex((cartItem) => cartItem.id == cItem.id);
    if (idx > -1)
        selectedItems.value.splice(idx, 1);
    else
        selectedItems.value.push(cItem);
}

const allSelected = computed(() => {
    return selectedItems.value.length > 0 && selectedItems.value.length == userCartItemsStore.cartItemsData.length;
});

const totalPrice = computed<number>(() => {
    let total = 0;
    selectedItems.value.forEach((cartItem) => {
        total += (cartItem.item.price * cartItem.count);
    });
    return total;
});

const selectAll = () => {
    if (allSelected.value === true) 
        selectedItems.value = [];
    else {
        userCartItemsStore.cartItemsData.forEach((cItem) => {
            const idx = selectedItems.value.findIndex((cartItem) => cartItem.id == cItem.id);
            if (idx < 0)
                selectedItems.value.push(cItem);
        });
    }
}

const onDelete = (cItem: CartItemSchema) => {
    const idx = selectedItems.value.findIndex((cartItem) => cartItem.id == cItem.id);
    if (idx > -1)
        selectedItems.value.splice(idx, 1);
    fetchState.execute();
}

const gotoCreateOrdersPage = async () => {
    if (selectedItems.value.length > 0) {
        userCreateOrdersStore.generateOrders(selectedItems.value);
        await router.push("/user/create-orders");
    }
    else {
        const toast = useToast();
        toast.warning("請先選擇商品");
    }
        
}
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">購物車</h2>
        <template v-if="userCartItemsStore.cartItemsData.length > 0">
            <div class="container" ref="loader">
                <div class="d-flex flex-row flex-fill">
                    <input class="form-check-input me-2" type="checkbox" :checked="allSelected" @click="selectAll">
                    <label class="form-label">全選</label>
                </div>
                <CartItemRow v-for="cartItem in userCartItemsStore.cartItemsData" :key="cartItem.id" :cart-item="cartItem" @checked-changed="selectedItemsOnChange(cartItem)"
                :checked="selectedItems.findIndex((cItem) => cItem.id == cartItem.id) > -1" @deleted="onDelete"/>
                <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                    <template #loading>
                        <h3 class="text-center">讀取中。。。</h3>
                    </template>
                </TriState>
            </div>
            <div class="container fixed-bottom">
                <div class="container bg-light">
                    <div class="row">
                        <div class="col-8">
                            <h5 class="text-start mt-3 align-start">總價：${{ totalPrice }}</h5>
                        </div>
                        <div class="col-4">
                            <div class="d-flex flex-row justify-content-end">
                                <button type="button" class="btn btn-danger align-bottom" @click="gotoCreateOrdersPage">點我下單</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <h3 class="text-center" v-else>你的購物車空空如也：）</h3>
    </LoginCheck>
</template>