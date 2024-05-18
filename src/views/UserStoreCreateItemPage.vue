<script setup lang="ts">
import { computed, ref } from 'vue';
import { CUItemSchema, FullItemSchema} from '../models';
import { ApiInstance } from '../api';
import { useToast } from 'vue-toast-notification';
import { router } from '../routes';
import { useItemsStore } from '../stores/itemsStore';
import ItemInfo from '../components/ItemInfo.vue';

const inputRef = ref<HTMLInputElement>();
const toast = useToast();

const useItemStore = useItemsStore();

const data = ref<CUItemSchema>({
    name: "",
    introduction: "",
    count: 1,
    price: 0,
    need_18: false,
    icon: null
});

const resetData = () => {
    data.value = {
        name: "",
        introduction: "",
        count: 1,
        price: 0,
        need_18: false,
        icon: null
    }
}

const onIconChange = () => {
    if (inputRef.value) {
        const files = inputRef.value.files;
        if (files)
            data.value.icon = files.item(0);
        else
            data.value.icon = null;
    }
}

const sendData = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/user/store/items", data.value);
        try {
            await useItemStore.fetchItemsData();
        }
        catch (err) {}
        await router.replace("/user/store/items");
        toast.success("創建成功！");
    }
    catch (err) {
        toast.error("創建失敗。");
    }
}

const item = computed<FullItemSchema>(() => {
    return {
        id: Infinity,
        store_id: Infinity,
        created_at: new Date(),
        name: "",
        introduction: "",
        count: 1,
        price: 0,
        need_18: false,
        icon: null,
        images: [],
        comments: [],
        store: {
            id: Infinity,
            name: "",
            introduction: "",
            icon: null,
            district_id: Infinity,
            created_at: new Date()
        }
    }
});


</script>

<template>
    <h2 class="text-center mb-3">建立商品</h2>
    <form class="mb-3" @submit.prevent="sendData" @reset.prevent="resetData">
        <div class="row mb-3">
            <div class="col-12 col-md-4">
                <div class="mb-3">
                    <label class="form-label">商品名稱</label>
                    <input type="text" class="form-control" placeholder="請輸入商品名稱" v-model="data.name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">商品Icon</label>
                    <input ref="inputRef" class="form-control" type="file" @change="onIconChange">
                </div>
            </div>
            <div class="col-12 col-md-8 mb-3">
                <label class="form-label">商品介紹</label>
                <textarea type="text" class="form-control h-100" placeholder="請輸入商品介紹" v-model="data.introduction" rows="10"></textarea>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="btn-group">
                <button type="submit" class="btn btn-success">點我創建商品</button>
                <button type="reset" class="btn btn-danger">重新填寫</button>
            </div> 
        </div>
    </form>
    <h3 class="mb-3">商品預覽</h3>
    <ItemInfo :item="item" :own-link="item.icon"/>
</template>