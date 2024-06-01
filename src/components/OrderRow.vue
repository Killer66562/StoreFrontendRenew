<script setup lang="ts">
import { OrderSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    orderedItem: OrderSchema
}>();
</script>

<template>
        <div class="row bg-light pt-1 pb-1">
            <div class="col-9 col-sm-10 col-md-10">
                <RouterLink :to="`/items/${orderedItem.id}`" class="text-decoration-none">
                    <div class="row">
                        <input type="checkbox">
                        <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                            <img class="img-fluid" :src="getStaticFile(orderedItem.item.icon)" :alt="`OrderedItem #${orderedItem.id}`" v-if="orderedItem.item.icon" style="aspect-ratio: 1 / 1;">
                            <img class="img-fluid" src="/src/assets/item.jpg" :alt="`OrderedItem #${orderedItem.id}`" v-else style="aspect-ratio: 1 / 1;">
                        </div>
                        <div class="col-5 col-sm-7 col-md-8 col-lg-9 pt-4">
                            <div class="row">
                                <div class="col-7">
                                    <h5 class="text-start text-dark text-truncate">{{ orderedItem.item.name }}</h5>
                                </div>
                                <div class="col-5 text-end fw-bold text-danger text-truncate">${{ orderedItem.item.price }}</div>
                                <div>{{ orderedItem.status }}</div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div class="col-3 col-sm-2 col-md-2 pt-4">
                <div class="d-flex flex-row justify-content-end">
                    <button class="btn btn-danger btn-sm" type="button">取消訂單</button>
                </div>
            </div>
        </div>
</template>