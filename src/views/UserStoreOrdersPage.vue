<script setup lang="ts">
import { ref } from 'vue';
import LoginCheck from '../components/LoginCheck.vue';
import { FullOrderSchema, PageSchema } from '../models';
import { ApiInstance } from '../api/apiInstance';
import { useAsyncState } from '@vueuse/core';
import StoreOrderRow from '../components/StoreOrderRow.vue'

const orders = ref<FullOrderSchema[]>([]);

const fetchOrders = async () => {
    const apiInstance = new ApiInstance();
    try {
        const fetchedData: PageSchema<FullOrderSchema> = await apiInstance.get("/user/store/orders", { page: 1 });
        orders.value.push(...fetchedData.items);
    }
    catch (err) {
        throw err;
    }
}

const fetchState = useAsyncState(() => fetchOrders(), undefined, { immediate: false });

const orderOnDelete = (orderId: number) => {
    const orderIndex = orders.value.findIndex((ord) => {
        return ord.id == orderId
    });
    if (orderIndex >= 0)
        orders.value.splice(orderIndex, 1);
}

fetchState.execute();
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">商店訂單一覽</h2>
        <StoreOrderRow :ordered-item="order" v-for="order in orders" :key="order.id" @order-delete="orderOnDelete"/>
    </LoginCheck>
</template>