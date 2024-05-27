<script setup lang="ts">
import { computed, ref } from 'vue';
import { CUItemSchema, FullItemSchema} from '../models';
import { ApiInstance } from '../api/apiInstance';
import { useToast } from 'vue-toast-notification';
import { router } from '../routes';
import { useItemsStore } from '../stores/itemsStore';
import ItemInfo from '../components/ItemInfo.vue';
import { getErrorMessage } from '../funcs';
import LoginCheck from '../components/LoginCheck.vue';
import { useUserStoreItemsStore } from '../stores/userStoreItemsStore';

const inputRef = ref<HTMLInputElement>();
const toast = useToast();

const useItemStore = useItemsStore();
const userStoreItemsStore = useUserStoreItemsStore();

const data = ref<CUItemSchema>({
    name: "",
    introduction: "",
    count: 1,
    price: 0,
    need_18: false,
    icon: null
});

const resetData = () => {
    key.value++;
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
        const newItem: FullItemSchema = await apiInstance.post("/user/store/items", data.value);
        try {
            await apiInstance.putForm(`/user/store/items/${newItem.id}/icon`, { icon: data.value.icon });
        }
        catch (err) {}
        try {
            userStoreItemsStore.reset();
            await userStoreItemsStore.fetchItemsData();
        }
        catch (err) {}
        try {
            useItemStore.resetAll();
            await Promise.all([
                useItemStore.fetchBestItems(),
                useItemStore.fetchHotItems(),
                useItemStore.fetchLikedItems(),
                useItemStore.fetchItemsData(),
            ]);
        }
        catch (err) {}
        await router.replace("/user/store");
        toast.success("創建成功！");
    }
    catch (err) {
        const errMessage = getErrorMessage(err);
        toast.error(errMessage);
    }
}

const iconUrl = computed(() => {
    if (data.value.icon) {
        const url = URL.createObjectURL(data.value.icon);
        return url;
    }
    else
        return null
})

const item = computed<FullItemSchema>(() => {
    return {
        id: Infinity,
        store_id: Infinity,
        created_at: new Date(),
        name: data.value.name,
        introduction: data.value.introduction,
        count: data.value.count,
        price: data.value.price,
        need_18: data.value.need_18,
        icon: iconUrl.value,
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

const key = ref<number>(0);

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <h2 class="text-center mb-3">建立商品</h2>
        <form class="mb-3" @submit.prevent="sendData" @reset.prevent="resetData">
            <div class="row">
                <div class="col-12 col-md-4">
                    <div class="mb-3">
                        <label class="form-label">商品名稱</label>
                        <input type="text" class="form-control" placeholder="請輸入商品名稱" v-model="data.name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">商品Icon</label>
                        <input ref="inputRef" class="form-control" type="file" @change="onIconChange" :key="key">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">商品價格</label>
                        <input min="0" class="form-control" type="number" v-model="data.price" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">商品數量</label>
                        <input min="1" class="form-control" type="number" v-model="data.count" required>
                    </div>
                </div>
                <div class="col-12 col-md-8 mb-3">
                    <label class="form-label">商品介紹</label>
                    <textarea type="text" class="form-control" placeholder="請輸入商品介紹" v-model="data.introduction" rows="12"></textarea>
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
        <ItemInfo :item="item" :own-link="item.icon" preview/>
    </LoginCheck>
</template>