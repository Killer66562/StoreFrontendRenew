<script setup lang="ts">
import { ref } from 'vue';
import { FullItemSchema } from '../models';
import ItemCard from './ItemCard.vue';
import { useIntersectionObserver } from '@vueuse/core';
import TriState from './TriState.vue';

const props = defineProps<{
    items: FullItemSchema[],
    canLoadMore: boolean,
    paused?: boolean,
    loading: boolean,
    ready: boolean
    error: any
}>();

const target = ref(null);

const emits = defineEmits<{
    loadMore: []
}>();

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting === true && props.loading !== true)
        emits('loadMore');
  },
  {
    immediate: true,
    threshold: 1
  }
)
</script>

<template>
    <template v-if="items.length > 0 || canLoadMore">
        <div class="row">
            <div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3" v-for="item in items">
                <ItemCard :item="item" :key="item.id" />
            </div>
        </div>
        <div class="row" ref="target">
            <TriState :loading="loading" :ready="ready" :error="error">
                <template #loading>
                    <div class="d-flex flex-row justify-content-center">
                      <VProgressCircular indeterminate size="80"/>
                    </div>
                </template>
                <template #error>
                    <h5 class="text-center" v-if="canLoadMore">載入失敗，請重試。</h5>
                </template>
            </TriState>
        </div>
    </template>
    <template v-else><h3 class="text-center">目前沒有任何商品喔</h3></template>
</template>