<script setup lang="ts">
import { useAsyncState, useIntersectionObserver } from '@vueuse/core';
import StoreOrderRow from '../components/StoreOrderRow.vue'
import { useStoreOrdersStore } from '../stores/storeOrdersStore';
import { onBeforeMount, ref } from 'vue';
import LoginCheck from '../components/LoginCheck.vue';
import TriState from '../components/TriState.vue';

const target = ref(null);
const storeOrdersStore = useStoreOrdersStore();

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting === true)
      loadState.execute(500);
  },
  {
    immediate: true,
    threshold: 1
  }
);

const loadState = useAsyncState(() => storeOrdersStore.loadMore(), undefined, { immediate: false });

const orderOnDelete = (orderId: number) => {
    const orderIndex = storeOrdersStore.data.findIndex((ord) => {
        return ord.id == orderId
    });
    if (orderIndex >= 0)
        storeOrdersStore.data.splice(orderIndex, 1);
}

onBeforeMount(() => {
  storeOrdersStore.reset();
});
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">商店訂單一覽</h2>
        <div ref="root">
            <StoreOrderRow :ordered-item="order" v-for="order in storeOrdersStore.data" :key="order.id" @order-delete="orderOnDelete"/>
            <div ref="target">
                <TriState :loading="loadState.isLoading.value" :ready="loadState.isReady.value" :error="loadState.error.value">
                  <template #loading>
                    <div class="d-flex flex-row justify-content-center">
                      <VProgressCircular indeterminate size="80"/>
                    </div>
                  </template>
                  <template #error>
                    <h5 class="text-center" v-if="storeOrdersStore.canLoadMore">載入失敗，請重試。</h5>
                  </template>
                </TriState>
            </div>
        </div>
    </LoginCheck>
</template>