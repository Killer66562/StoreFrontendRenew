<script setup lang="ts">
import { FullItemSchema } from '../models';
import ItemCard from './ItemCard.vue';

defineProps<{
    items: FullItemSchema[],
    canLoadMore?: boolean,
    loading?: boolean,
    error?: any
}>();

const emits = defineEmits<{
    loadMore: []
}>();
</script>

<template>
    <template v-if="items.length > 0">
        <div class="row">
            <div class="col-6 col-sm-4 col-md-3 col-xl-2 mb-3" v-for="item in items" >
                <ItemCard :item="item" :key="item.id" />
            </div>
        </div>
        <div class="row">
            <h5 class="text-center" v-if="error">載入失敗，請重試。</h5>
            <button type="button" class="btn btn-warning" @click="emits('loadMore')" v-if="canLoadMore" :disabled="loading">載入更多</button>
        </div>
    </template>
    <template v-else><h3 class="text-center">目前沒有任何商品喔</h3></template>
</template>