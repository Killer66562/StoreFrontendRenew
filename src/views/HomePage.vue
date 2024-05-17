<script setup lang="ts">
import { useItemsStore } from '../stores/itemsStore';
import ItemCardRow from '../components/ItemCardRow.vue';
import TriState from '../components/TriState.vue';
import { useRootStore } from '../stores/rootStore';
import ItemCard from '../components/ItemCard.vue';

const rootStore = useRootStore();
const itemsStore = useItemsStore();

</script>

<template>
    <h2>熱銷商品</h2>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
        <template #loading><h3 class="text-center">讀取中。。。</h3></template>
        <template #ready><ItemCardRow :items="itemsStore.hotItems" /></template>
        <template #error><h3 class="text-center">讀取失敗。請重新整理頁面。</h3></template>
    </TriState>
    <h2>精選好物</h2>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
        <template #loading><h3 class="text-center">讀取中。。。</h3></template>
        <template #ready><ItemCardRow :items="itemsStore.bestItems" /></template>
        <template #error><h3 class="text-center">讀取失敗。請重新整理頁面。</h3></template>
    </TriState>
    <h2>你可能會喜歡</h2>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
        <template #loading><h3 class="text-center">讀取中。。。</h3></template>
        <template #ready><ItemCardRow :items="itemsStore.likedItems" /></template>
        <template #error><h3 class="text-center">讀取失敗。請重新整理頁面。</h3></template>
    </TriState>
    <h2>商品一覽</h2>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
        <template #loading><h3 class="text-center">讀取中。。。</h3></template>
        <template #ready>
            <template v-if="itemsStore.itemsData.length > 0">
                <div class="row">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2 mb-3" v-for="item in itemsStore.itemsData" >
                        <ItemCard :item="item" :key="item.id" />
                    </div>
                </div>
            </template>
            <template v-else><h3 class="text-center">目前沒有任何商品喔</h3></template>
        </template>
        <template #error><h3 class="text-center">讀取失敗。請重新整理頁面。</h3></template>
    </TriState>
</template>