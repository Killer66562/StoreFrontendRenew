<script setup lang="ts">
import { FullItemSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    item: FullItemSchema
}>();
</script>

<template>
    <h6>{{ item.store.name }}</h6>
    <div class="row">
        <div class="col-4">
            <img class="img-fluid" :src="getStaticFile(item.icon)" v-if="item.icon" :alt="`item #${item.id}`">
            <img class="img-fluid" src="/src/assets/item.jpg" v-if="item.icon" :alt="`item #${item.id}`">
        </div>
        <div class="col-8">
            <h5>{{ item.name }}</h5>
            <h6 class="text-danger">${{ item.price }}</h6>
        </div>
    </div>
</template>