<script setup lang="ts">
import { FullItemSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    item: FullItemSchema
}>();
</script>

<template>
    <div class="row mb-3">
        <div class="col-4 col-md-3" v-for="image in item.images" :key="image.id" >
            <img class="img-fluid h-100" :src="getStaticFile(image.path)" :alt="`item image #${image.id}`" style="aspect-ratio: 1 / 1;">
        </div>
    </div>
</template>