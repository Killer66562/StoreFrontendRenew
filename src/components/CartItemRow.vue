<script setup lang="ts">
import { CartItemSchema } from '../models';
import { getStaticFile } from '../funcs';
import LoginCheck from './LoginCheck.vue';

const emits = defineEmits<{
    checkedChanged: []
}>();

defineProps<{
    cartItem: CartItemSchema
}>();
</script>

<template>
    <LoginCheck>
        <div class="row bg-light">
            <div class="col-sm-auto d-flex align-items-center">
                <div class="pb-2">
                    <input type="checkbox" class="form-check-input align-middle" @change="emits('checkedChanged')" />
                </div>
            </div>
            <div class="col-11">
                <div class="row">
                    <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                        <RouterLink :to="`/items/${cartItem.item.id}`" class="text-decoration-none">
                            <img class="img-fluid h-100" :src="getStaticFile(cartItem.item.icon)" :alt="`CartItem #${cartItem.id}`" v-if="cartItem.item.icon" style="aspect-ratio: 1 / 1;">
                            <img class="img-fluid" src="/src/assets/item.jpg" :alt="`CartItem #${cartItem.id}`" v-else style="aspect-ratio: 1 / 1;">
                        </RouterLink>
                    </div>
                    <div class="col-7 col-sm-8 col-md-9 col-lg-10">
                        <h5>{{ cartItem.item.name }}</h5>
                        <h6 class="text-danger">${{ cartItem.item.price }}</h6>
                        <div class="row">
                            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                                <input class="form-control " type="number" v-model="cartItem.count" min="1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row flex-fill justify-content-end align-items-center">
                <button class="btn btn-danger btn-sm" type="button">刪除</button>
            </div>
        </div>
    </LoginCheck>
</template>