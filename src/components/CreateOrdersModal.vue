<script setup lang="ts">
import { CUOrderSchema, CartItemSchema } from '../models';
import { getStaticFile } from '../funcs';
import { ref } from 'vue';

const props = defineProps<{
    modalId: string,
    cartItems: CartItemSchema[]
}>();

const arr = ref<CUOrderSchema[]>([]);

props.cartItems.forEach(element => {
    arr.value[element.id] = {
        item_id: element.item.id,
        count: element.count,
        address: "",
        note: null
    }
});

</script>

<template>
    <div :id="modalId" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <template v-for="cartItem in cartItems">
                            <p>{{ cartItem.item.store }}</p>
                            <div class="row">
                                <div class="col-2">
                                    <img class="img-fluid" :src="getStaticFile(cartItem.item.icon)" :alt="`item #${cartItem.item.id}`" v-if="cartItem.item.icon">
                                    <img class="img-fluid" src="/src/assets/item.jpg" :alt="`item #${cartItem.item.id}`" v-else>
                                </div>
                                <div class="col-10">
                                    <h5>{{ cartItem.item.name }}</h5>
                                    <h6 class="text-danger">${{ cartItem.item.price }}</h6>
                                    <input type="text" class="form-control" v-model="arr[cartItem.id].address">
                                    <input type="text" class="form-control" v-model="arr[cartItem.id].note">
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</template>