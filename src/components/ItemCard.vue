<script setup lang="ts">
import { FullItemSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    item: FullItemSchema,
    show?: boolean
}>();
</script>

<template>
    <RouterLink class="text-decoration-none" :to="`/items/${item.id}`">
        <div class="card h-100">
            <div class="card-body">
                <img :src="getStaticFile(item.icon)" class="card-img-top mb-3" :alt="`商品#${item.id}`" v-if="item.icon" style="aspect-ratio: 1 / 1;">
                <img src="/src/assets/item.jpg" class="card-img-top mb-3" :alt="`商品#${item.id}`" v-else style="aspect-ratio: 1 / 1;">
                <h5 class="card-title">{{ item.name }}</h5>
                <h6 class="card-subtitle mb-2 text-danger">${{ item.price }}</h6>
                <p class="card-text text-truncate">還剩{{ item.count }}個</p>
                <p class="card-text text-truncate">🏪{{ item.store.name }}</p>
                <VRating color="danger" size="x-tiny" readonly v-model="item.average_stars" half-increments />
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
.card:hover {
    box-shadow: rgba(255, 255, 127, 0.6) 0px 20px 40px;
    transform: translate3d(0px, -5px, 5px);
}
</style>