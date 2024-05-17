<script setup lang="ts">
import { ItemSchema } from '../models';
import ItemCard from './ItemCard.vue';

defineProps<{
    items: ItemSchema[]
}>();
</script>

<template>
    <template v-if="items.length > 0">
        <div class="row flex-nowrap overflow-auto mb-3">
            <ItemCard :item="item" v-for="item in items" :key="item.id"/>
        </div>
    </template>
    <template v-else>
        <h3 class="text-center mb-3">目前沒有任何商品喔</h3>
    </template>
</template>