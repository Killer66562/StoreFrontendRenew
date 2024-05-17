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
            <div class="col-6 col-sm-4-col-md-3 col-xl-2" v-for="item in items" :key="item.id">
                <ItemCard :item="item"/>
            </div>
        </div>
    </template>
    <template v-else>
        <h3 class="text-center mb-3">目前沒有任何商品喔</h3>
    </template>
</template>