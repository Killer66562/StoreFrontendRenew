<script setup lang="ts">
import { ref } from 'vue';
import { FullItemSchema } from '../models';
import ItemCard from './ItemCard.vue';
import { useIntersectionObserver } from '@vueuse/core';

defineProps<{
    items: FullItemSchema[],
    canLoadMore?: boolean,
    loading?: boolean,
    error?: any
}>();

const target = ref(null);

const emits = defineEmits<{
    loadMore: []
}>();

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting === true)
        emits('loadMore');
  },
)
</script>

<template>
    <template v-if="items.length > 0">
        <div class="row">
            <div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3" v-for="item in items">
                <ItemCard :item="item" :key="item.id" />
            </div>
        </div>
        <div class="row" ref="target">
            <h5 class="text-center" v-if="error">載入失敗，請重試。</h5>
            <button type="button" class="btn btn-warning" @click="emits('loadMore')" v-if="canLoadMore" :disabled="loading">載入更多</button>
        </div>
    </template>
    <template v-else><h3 class="text-center">目前沒有任何商品喔</h3></template>
</template>