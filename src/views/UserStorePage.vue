<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import TriState from '../components/TriState.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
import { useRootStore } from '../stores/rootStore';

const rootStore = useRootStore();
const userStoreStore = useUserStoreStore();
</script>

<template>
    <LoginCheck>
        <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
            <template #loading>
                <h2 class="text-center">讀取中。。。</h2>
            </template>
            <template #ready>
                <template v-if="userStoreStore.userStoreData">
                    <StoreInfo :store="userStoreStore.userStoreData" />
                    <RouterLink to="/user/create-item">點我上架新商品</RouterLink>
                </template>
                <template v-else>
                    <h2 class="text-center">你還沒有創建商店喔</h2>
                    <div class="text-center" >
                        <RouterLink to="/user/create-store">點我創建商店</RouterLink>
                    </div>
                </template>
            </template>
            <template #error>
                <h2 class="text-center">讀取失敗。</h2>
            </template>
        </TriState>
        <template #notLogin></template>
    </LoginCheck>
</template>