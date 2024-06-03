<script setup lang="ts">
import { useAsyncState, useIntersectionObserver } from '@vueuse/core';
import StoreOrderRow from '../components/StoreOrderRow.vue'
import { useStoreOrdersStore } from '../stores/storeOrdersStore';
import { onBeforeMount, ref } from 'vue';
import LoginCheck from '../components/LoginCheck.vue';

const root = ref(null);
const upperTarget = ref(null);
const lowerTarget = ref(null);

const emits = defineEmits<{
    loadMore: []
}>();

useIntersectionObserver(
  upperTarget,
  ([{ isIntersecting }]) => {
    if (isIntersecting === true)
        loadUpperState.execute();
  },
  {
    immediate: true,
    root: root
  }
);

useIntersectionObserver(
  lowerTarget,
  ([{ isIntersecting }]) => {
    if (isIntersecting === true)
        loadLowerState.execute();
  },
  {
    immediate: true,
  }
);

const storeOrdersStore = useStoreOrdersStore();

const loadUpperState = useAsyncState(() => storeOrdersStore.loadUpper(), undefined, { immediate: false });
const loadLowerState = useAsyncState(() => storeOrdersStore.loadLower(), undefined, { immediate: false });

const orderOnDelete = (orderId: number) => {
    const orderIndex = storeOrdersStore.data.findIndex((ord) => {
        return ord.id == orderId
    });
    if (orderIndex >= 0)
        storeOrdersStore.data.splice(orderIndex, 1);
}

onBeforeMount(() => {
    storeOrdersStore.pageSwitch();
})
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">商店訂單一覽</h2>
        <div ref="root">
            <div class="mb-3" ref="upperTarget"></div>
            <StoreOrderRow :ordered-item="order" v-for="order in storeOrdersStore.data" :key="order.id" @order-delete="orderOnDelete"/>
            <div class="mt-3" ref="lowerTarget"></div>
            </div>
    </LoginCheck>
</template>