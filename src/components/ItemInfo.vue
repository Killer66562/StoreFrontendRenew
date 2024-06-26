<script setup lang="ts">
import { FullItemSchema, CUCartItemSchema } from '../models';
import { getErrorMessage, getStaticFile } from '../funcs';
import { ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { useToast } from 'vue-toast-notification';
import { useUserLikedItemsStore } from '../stores/userLikedItemsStore';
import { useUserCartItemsStore } from '../stores/userCartItemsStore';
import LoginCheck from './LoginCheck.vue';
import { router } from '../routes';
import { useUserDataStore } from '../stores';

const toast = useToast();
const userLikedItemsStore = useUserLikedItemsStore();
const userCartItemsStore = useUserCartItemsStore();
const userDataStore = useUserDataStore();

const emits = defineEmits<{
    report: []
}>();

const props = defineProps<{
    item: FullItemSchema,
    ownLink?: string | null,
    preview?: boolean
}>();

const data = ref<CUCartItemSchema>({
    item_id: props.item.id,
    count: 1
});

const addToCartItems = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/user/cart_items", data.value);
        toast.success("成功將商品加入購物車！");
        userLikedItemsStore.reset();
        try {
            await userCartItemsStore.fetchCartItems();
        }
        catch (err) {}
    }
    catch (err) {
        const errMessage = getErrorMessage(err);
        toast.error(errMessage);
    }
}

const addToLikedItems = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/user/liked_items", data.value);
        toast.success("成功將商品加入願望清單！");
        try {
            await userLikedItemsStore.fetchLikedItems();
        }
        catch (err) {}
    }
    catch (err) {
        const errMessage = getErrorMessage(err);
        toast.error(errMessage);
    }
}

const gotoEditPage = async () => {
    await router.push(`/user/edit-item/${props.item.id}`);
}
</script>

<template>
    <div class="row mb-3">
        <div class="col-12 col-sm-6 col-md-3">
            <template v-if="preview === true">
                <img class="img-fluid h-100 mb-3" :src="ownLink" :alt="`item #${item.id}`" v-if="ownLink" style="aspect-ratio: 1 / 1;">
                <img class="img-fluid h-100 mb-3" src="/src/assets/item.jpg" :alt="`item #${item.id}`" v-else style="aspect-ratio: 1 / 1;">
            </template>
            <img class="img-fluid h-100 mb-3" :src="getStaticFile(item.icon)" :alt="`item #${item.id}`" v-else-if="item.icon" style="aspect-ratio: 1 / 1;">
            <img class="img-fluid h-100 mb-3" src="/src/assets/item.jpg" :alt="`item #${item.id}`" v-else style="aspect-ratio: 1 / 1;">
            <div class="row">
                <div class="col-3" v-for="image in item.images" :key="image.id">
                    <img class="img-fluid h-100" :src="getStaticFile(image.path)" :alt="`item #${item.id}`" style="aspect-ratio: 1 / 1;">
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-9">
            <h4 class="mb-3">{{ item.name }}</h4>
            <h5 class="text-danger mb-3">${{ item.price }}</h5>
            <h5 class="mb-3">還剩{{ item.count }}個</h5>
            <VRating color="danger" size="x-tiny" readonly v-model="item.average_stars" half-increments />
            <div class="input-group-sm">
                <span class="input-group-text">數量</span>
                <input type="number" min="1" step="1" class="form-control" placeholder="數量" v-model="data.count">
                <template v-if="preview === true">
                    <button class="btn btn-outline-danger" type="button" @click="">加入購物車</button>
                    <button class="btn btn-outline-success" type="button" @click="">加入願望清單</button>
                </template>
                <template v-else>
                    <LoginCheck use-own-not-login-handler>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-danger" type="button" @click="addToCartItems">加入購物車</button>
                            <button class="btn btn-sm btn-outline-success" type="button" @click="addToLikedItems">加入願望清單</button>
                            <button class="btn btn-sm btn-outline-dark" type="button" @click="emits('report')" >顯示/隱藏檢舉商品表單</button>
                            <button class="btn btn-sm btn-outline-secondary" type="button" @click="gotoEditPage" v-if="item.store.user_id == userDataStore.userData?.id">更新商品資訊</button>
                        </div>
                    </LoginCheck>
                </template>
                <p>{{ item.introduction }}</p>
            </div>
        </div>
    </div>
</template>