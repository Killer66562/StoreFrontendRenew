<script setup lang="ts">
import { FullLikedItemSchema } from '../models';
import { getStaticFile } from '../funcs';
import { useToast } from 'vue-toast-notification';
import { useUserLikedItemsStore } from '../stores/userLikedItemsStore';
import { ApiInstance } from '../api/apiInstance';

const emits = defineEmits<{
    del: [FullLikedItemSchema]
}>();

const props = defineProps<{
    likedItem: FullLikedItemSchema
}>();

const toast = useToast();
const userLikedItemsStore = useUserLikedItemsStore();

const deleteLikedItem = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.delete(`/user/liked_items/${props.likedItem.id}`);
        toast.success(`成功將${props.likedItem.item.name}移出願望清單！`);
        try {
            await userLikedItemsStore.fetchLikedItems();
        }
        catch (err) {}
    }
    catch (err) {
        toast.error(err as string);
    }
}
</script>

<template>
        <div class="row pt-1 pb-1">
            <div class="col-9 col-sm-10 col-md-10">
                <RouterLink :to="`/items/${likedItem.item.id}`" class="text-decoration-none">
                    <div class="row">
                        <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                            <img class="img-fluid" :src="getStaticFile(likedItem.item.icon)" :alt="`LikedItem #${likedItem.item.id}`" v-if="likedItem.item.icon" style="aspect-ratio: 1 / 1;">
                            <img class="img-fluid" src="/src/assets/item.jpg" :alt="`LikedItem #${likedItem.id}`" v-else style="aspect-ratio: 1 / 1;">
                        </div>
                        <div class="col-5 col-sm-7 col-md-8 col-lg-9 pt-4">
                            <div class="row">
                                <div class="col-7">
                                    <h5 class="text-start text-dark text-truncate">{{ likedItem.item.name }}</h5>
                                </div>
                                <div class="col-5 text-end fw-bold text-danger text-truncate">${{ likedItem.item.price }}</div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div class="col-3 col-sm-2 col-md-2 pt-4">
                <div class="d-flex flex-row justify-content-end">
                    <button class="btn btn-danger btn-sm" type="button" @click="deleteLikedItem">刪除</button>
                </div>
            </div>
        </div>
</template>