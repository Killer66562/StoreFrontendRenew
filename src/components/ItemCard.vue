<script setup lang="ts">
import { ItemSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    item: ItemSchema
}>();
</script>

<template>
    <RouterLink class="text-decoration-none" :to="`/items/${item.id}`">
        <div class="card">
            <div class="card-body">
                <img :src="getStaticFile(item.icon)" class="card-img-top mb-3" :alt="`商品#${item.id}`" v-if="item.icon" style="aspect-ratio: 1 / 1;">
                <img src="/src/assets/item.jpg" class="card-img-top mb-3" :alt="`商品#${item.id}`" v-else style="aspect-ratio: 1 / 1;">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text text-truncate">{{ item.introduction }}</p>
                <h6 class="card-subtitle mb-2 text-danger">${{ item.price }}</h6>
            </div>
        </div>
    </RouterLink>
</template>