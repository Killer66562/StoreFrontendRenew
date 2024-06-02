<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import TriState from '../components/TriState.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
import { useRootStore } from '../stores/rootStore';
import ItemCardAll from '../components/ItemCardAll.vue';
import { useUserStoreItemsStore } from '../stores/userStoreItemsStore';
import { useAsyncState } from '@vueuse/core';

const rootStore = useRootStore();
const userStoreStore = useUserStoreStore();
const userStoreItemsStore = useUserStoreItemsStore();

const fetchState = useAsyncState(() => userStoreItemsStore.fetchItemsData(), undefined, { immediate: false });

fetchState.execute();
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
                    <div class="mb-3">
                        <RouterLink to="/user/create-item">點我上架新商品</RouterLink>                    
                    </div>
                    <div class="mb-3">
                        <RouterLink to="/user/store-orders">查看訂單</RouterLink>
                    </div>
                    <div class="d-flex flex-row justify-content-end mb-3">
                        <div class="me-3">
                            <label class="form-label">倒序</label>
                            <input type="checkbox" class="form-check-input">
                        </div>
                        <div class="me-3">
                            <label class="form-label">顯示18禁商品</label>
                            <input type="checkbox" class="form-check-input">
                        </div>
                        <div class="me-3">
                            <label class="form-label">排序方式</label>
                        </div>
                        <div>
                            <select class="form-select">
                                <option selected>預設</option>
                                <option>商品名稱</option>
                                <option>最熱銷</option>
                                <option>評分最高</option>
                            </select>
                        </div>
                    </div>
                    <ItemCardAll :items="userStoreItemsStore.itemsData" :loading="fetchState.isLoading.value" :error="fetchState.error.value" :canLoadMore="userStoreItemsStore.canLoadMore" @loadMore="fetchState.execute" />
                </template>
                <template v-else>
                    <h2 class="text-center">你還沒有建立自己的拍賣小舖喔</h2>
                    <div class="text-center" >
                        <RouterLink to="/user/create-store">點我建立</RouterLink>
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