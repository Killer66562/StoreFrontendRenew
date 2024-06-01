<script setup lang="ts">
import { CIOrderSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    order: CIOrderSchema
}>();

const emits = defineEmits<{
    fillAddress: [string]
}>();

</script>

<template>
    <div class="row">
        <div class="col-4 col-sm-3 col-md-2 col-lg-1 mb-3">
            <img class="img-fluid" :src="getStaticFile(order.cartItem.item.icon)" :alt="`cartItem #${order.cartItem.id}`" style="aspect-ratio: 1 / 1;" v-if="order.cartItem.item.icon">
            <img class="img-fluid" src="/src/assets/item.jpg" :alt="`cartItem #${order.cartItem.id}`" style="aspect-ratio: 1 / 1;" v-else>
        </div>
        <div class="col-8 col-sm-9 col-md-10 col-lg-11 mb-3">
            <h5>{{ order.cartItem.item.name }}</h5>
            <h6 class="text-danger">${{ order.cartItem.item.price }}</h6>
            <p>數量：{{ order.cartItem.count }}</p>
        </div>
        <div class="mb-3">
            <label class="form-label">地址</label>
            <input type="text" class="form-control form-control-sm" v-model="order.order.address" required>
        </div>
        <div class="mb-3">
            <label class="form-label">備註</label>
            <input type="text" class="form-control form-control-sm" v-model="order.order.note">
        </div>
        <div class="mb-3">
            <button type="button" class="btn btn-sm btn-outline-dark" @click="emits('fillAddress', order.order.address)">為所有訂單套用此訂單使用的地址</button>
        </div>
    </div>
</template>