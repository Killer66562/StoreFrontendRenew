<script setup lang="ts">
import { CartItemSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    cartItem: CartItemSchema
}>();
</script>

<template>
        <div class="row bg-light pt-1 pb-1">
            <div class="col-9 col-sm-10 col-md-10">
                <RouterLink :to="`items/${cartItem.id}`" class="text-decoration-none">
                    <div class="row">
                        <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                            <input type="checkbox"  />
                            <img class="img-fluid" :src="getStaticFile(cartItem.item.icon)" :alt="`LikedItem #${cartItem.id}`" v-if="cartItem.item.icon" style="aspect-ratio: 1 / 1;">
                            <img class="img-fluid" src="/src/assets/item.jpg" :alt="`LikedItem #${cartItem.id}`" v-else style="aspect-ratio: 1 / 1;">
                        </div>
                        <div class="col-5 col-sm-7 col-md-8 col-lg-9 pt-4">
                            <div class="row">
                                <div class="col-7">
                                    <h5 class="text-start text-dark text-truncate">{{ cartItem.item.name }}</h5>
                                </div>
                                <div class="col-5 text-end fw-bold text-danger text-truncate">{{ cartItem.count }}　　　　${{ cartItem.item.price }}</div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div class="col-3 col-sm-2 col-md-2 pt-4">
                <div class="d-flex flex-row justify-content-end">
                    <button class="btn btn-danger btn-sm" type="button">刪除</button>
                </div>
            </div>
        </div>
</template>