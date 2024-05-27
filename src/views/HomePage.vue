<script setup lang="ts">
import { useItemsStore } from '../stores/itemsStore';
import ItemCardRow from '../components/ItemCardRow.vue';
import ItemCard from '../components/ItemCard.vue';
import { useAsyncState } from '@vueuse/core';
import InitCheck from '../components/InitCheck.vue';

const itemsStore = useItemsStore();

const fetchState = useAsyncState(() => itemsStore.fetchItemsData(), undefined, { immediate: false })
</script>

<template>
    <h2>熱銷商品</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.hotItems" /></template>
    </InitCheck>
    <h2>精選好物</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.bestItems" /></template>
    </InitCheck>
    <h2>你可能會喜歡</h2>
    <InitCheck>
        <template #ready><ItemCardRow :items="itemsStore.likedItems" /></template>
    </InitCheck>
    <h2>商品一覽</h2>
    <InitCheck>
        <template #ready>
            <template v-if="itemsStore.itemsData.length > 0">
                <div class="row">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2 mb-3" v-for="item in itemsStore.itemsData" >
                        <ItemCard :item="item" :key="item.id" />
                    </div>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-warning" @click="fetchState.execute" v-if="itemsStore.canLoadMore" :disabled="fetchState.isLoading.value">載入更多</button>
                </div>
            </template>
            <template v-else><h3 class="text-center">目前沒有任何商品喔</h3></template>
        </template>
    </InitCheck>
</template>