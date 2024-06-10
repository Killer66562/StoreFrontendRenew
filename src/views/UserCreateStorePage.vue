<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { StoreSchema, CUStoreSchema, FullDistrictSchema } from '../models';
import { useCitiesStore } from '../stores/citiesStore';
import { useDistrictsStore } from '../stores/districtsStore';
import StoreInfo from '../components/StoreInfo.vue';
import { ApiInstance } from '../api/apiInstance';
import { useToast } from 'vue-toast-notification';
import { router } from '../routes';
import { useUserStoreStore } from '../stores/userStoreStore';
import { getErrorMessage } from '../funcs';
import LoginCheck from '../components/LoginCheck.vue';

const inputRef = ref<HTMLInputElement>();
const toast = useToast();

const userStoreStore = useUserStoreStore();

const selectedCityId = ref<number>();

const filteredDistricts = computed<FullDistrictSchema[]>(() => {
    if (selectedCityId !== undefined)
        return districtsStore.districtsData.filter((district) => district.city_id == selectedCityId.value);
    else
        return [];
});

const citiesStore = useCitiesStore();
const districtsStore = useDistrictsStore();

const data = ref<CUStoreSchema>({
    name: "",
    introduction: "",
    district_id: undefined,
    icon: null
});

const iconUrl = computed(() => {
    if (data.value.icon) {
        const url = URL.createObjectURL(data.value.icon);
        return url;
    }
    else
        return null
});

const store = computed<StoreSchema>(() => {
    return {
        id: Infinity,
        name: data.value.name,
        introduction: data.value.introduction,
        icon: iconUrl.value,
        district_id: data.value.district_id ? data.value.district_id : Infinity,
        user_id: 0,
        created_at: new Date()
    }
});

watch(selectedCityId, () => {
    data.value.district_id = undefined;
})

const resetData = () => {
    data.value = {
        name: "",
        introduction: "",
        district_id: undefined,
        icon: null
    }
    selectedCityId.value = undefined;
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
        await apiInstance.post("/user/store", data.value);
        try {
            await apiInstance.put(`/user/store/icon`, { icon: data.value.icon });
        }
        catch (err) {}
        try {
            await userStoreStore.fetchData();
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

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="onNotLogin">
        <h2 class="text-center mb-3">建立拍賣小舖</h2>
        <form class="mb-3" @submit.prevent="sendData" @reset.prevent="resetData">
            <div class="row mb-3">
                <div class="col-12 col-md-4">
                    <div class="mb-3">
                        <label class="fomr-label">拍賣小舖名稱</label>
                        <input type="text" class="form-control" placeholder="請輸入拍賣小舖名稱" v-model="data.name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">拍賣小舖Icon</label>
                        <input ref="inputRef" class="form-control" type="file" @change="onIconChange">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">拍賣小舖所在城市</label>
                        <select class="form-select" required v-model="selectedCityId">
                            <option :value="undefined">請選擇城市</option>
                            <option :value="city.id" v-for="city in citiesStore.citiesData" :key="city.id">{{ city.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">拍賣小舖所在地區</label>
                        <select class="form-select" required v-model="data.district_id">
                            <option :value="undefined">請選擇地區</option>
                            <option :value="district.id" v-for="district in filteredDistricts" :key="district.id">{{ district.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-8 mb-3">
                    <label class="fomr-label">拍賣小舖介紹</label>
                    <textarea type="text" class="form-control h-100" placeholder="請輸入拍賣小舖介紹" v-model="data.introduction" rows="10"></textarea>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-center">
                <div class="btn-group">
                    <button type="submit" class="btn btn-success">點我創建商店</button>
                    <button type="reset" class="btn btn-danger">重新填寫</button>
                </div> 
            </div>
        </form>
        <h3 class="mb-3">拍賣小舖預覽</h3>
        <StoreInfo :store="store" :own-link="store.icon"/>
    </LoginCheck>
</template>