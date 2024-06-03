<script setup lang="ts">
import { FullOrderSchema } from '../models';
import { getErrorMessage, getStaticFile } from '../funcs';
import { ApiInstance } from '../api/apiInstance';
import { useToast } from 'vue-toast-notification';
import { useAsyncState } from '@vueuse/core';
import { getOrderStatusText } from '../funcs';

const props = defineProps<{
    orderedItem: FullOrderSchema
}>();

const emits = defineEmits<{
    orderDelete: [number],
    orderUpdate: [number]
}>();

const deleteOrder = async () => {
    const apiInstance = new ApiInstance();
    const toast = useToast();
    try {
        await apiInstance.delete(`/user/store/orders/${props.orderedItem.id}`);
        toast.success(`你拒絕了訂單 #${props.orderedItem.id}`);
        emits('orderDelete', props.orderedItem.id);
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const acceptOrder = async () => {
    const apiInstance = new ApiInstance();
    const toast = useToast();
    try {
        await apiInstance.put(`/user/store/orders/${props.orderedItem.id}`, undefined);
        toast.success(`已為訂單 #${props.orderedItem.id} 出貨`);
        emits('orderUpdate', props.orderedItem.id);
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const deleteOrderState = useAsyncState(() => deleteOrder(), undefined, { immediate: false });
</script>

<template>
    <div class="row mb-3">
        <div class="col-3 col-md-2 col-lg-1">
            <RouterLink :to="`/items/${orderedItem.item.id}`">
                <img class="img-fluid" :src="getStaticFile(orderedItem.item.icon)" :alt="`Order #${orderedItem.id}`" v-if="orderedItem.item.icon" style="aspect-ratio: 1 / 1;">
                <img class="img-fluid" src="/src/assets/item.jpg" :alt="`Order #${orderedItem.id}`" v-else style="aspect-ratio: 1 / 1;">
            </RouterLink>
        </div>
        <div class="col-6 col-md-6 col-lg-7">
            <h5 class="text-break">{{ orderedItem.item.name }}</h5>
            <div>下單人：{{ orderedItem.owner.username }}</div>
            <div>數量：{{ orderedItem.count }}</div>
            <div class="text-danger">總價：${{ orderedItem.total_price }}</div>
            <div>送貨地址：{{ orderedItem.address }}</div>
        </div>
        <div class="col-3 col-md-2">
            <h6 class="align-text-break">{{ getOrderStatusText(orderedItem.status) }}</h6>
        </div>
        <div class="col-12 col-md-2">
            <div class="d-flex justify-content-end align-content-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-danger" @click="deleteOrderState.execute" :disabled="deleteOrderState.isLoading.value || orderedItem.status != 1">拒絕訂單</button>
                    <button type="button" class="btn btn-sm btn-success" @click="acceptOrder" :disabled="deleteOrderState.isLoading.value || orderedItem.status != 1">確認出貨</button>
                </div>
            </div>
        </div>
    </div>
</template>