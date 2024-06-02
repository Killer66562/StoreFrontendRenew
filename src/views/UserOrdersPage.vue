<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { useUserOrdersStore } from '../stores/userOrdersStore';
import { ref } from 'vue';
import orderRow from '../components/OrderRow.vue';
import TriState from '../components/TriState.vue';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';

const loader = ref();
const userOrdersStore = useUserOrdersStore();

const fetchState = useAsyncState(() => userOrdersStore.fetchOrders(), undefined, { immediate: false });

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <h2 class="text-center">訂單狀態一覽</h2>
        <template v-if="userOrdersStore.orderItemsData.length > 0">
            <div class="row mb-3">
                <div class="col-3 col-md-2 col-lg-1"></div>
                <div class="col-6 col-md-6 col-lg-7">
                    <h4>訂單資訊</h4>
                </div>
                <div class="col-3 col-md-2">
                    <h4>訂單狀態</h4>
                </div>
            </div>
            <div class="container" ref="loader">
                <orderRow v-for="cartItem in userOrdersStore.orderItemsData" :key="cartItem.id" :orderedItem="cartItem" />
                <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
                    <template #loading>
                        <h3 class="text-center">讀取中。。。</h3>
                    </template>
                </TriState>
            </div>
        </template>
        <h3 class="text-center" v-else>你還沒下單喔，趕快下單吧！</h3>
    </LoginCheck>
</template>