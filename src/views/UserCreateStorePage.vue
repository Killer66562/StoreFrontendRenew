<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { StoreSchema, CUStoreSchema, CitySchema, FullDistrictSchema } from '../models';
import { useCitiesStore } from '../stores/citiesStore';
import { useDistrictsStore } from '../stores/districtsStore';
import StoreInfo from '../components/StoreInfo.vue';

const inputRef = ref<HTMLInputElement>();

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
        console.log(url);
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
</script>

<template>
    <h2 class="text-center mb-3">建立商店</h2>
    <form class="mb-3" @submit="" @reset="resetData">
        <div class="row mb-3">
            <div class="col-12 col-md-4">
                <div class="mb-3">
                    <label class="fomr-label">商店名稱</label>
                    <input type="text" class="form-control" placeholder="請輸入商店名稱" v-model="data.name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">商店Icon</label>
                    <input ref="inputRef" class="form-control" type="file" @change="onIconChange">
                </div>
                <div class="mb-3">
                    <label class="form-label">商店所在城市</label>
                    <select class="form-select" required v-model="selectedCityId">
                        <option :value="undefined">請選擇城市</option>
                        <option :value="city.id" v-for="city in citiesStore.citiesData" :key="city.id">{{ city.name }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">商店所在地區</label>
                    <select class="form-select" required v-model="data.district_id">
                        <option :value="undefined">請選擇地區</option>
                        <option :value="district.id" v-for="district in filteredDistricts" :key="district.id">{{ district.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-8 mb-3">
                <label class="fomr-label">商店介紹</label>
                <textarea type="text" class="form-control h-100" placeholder="請輸入商店介紹" v-model="data.introduction" rows="10"></textarea>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="btn-group">
                <button type="submit" class="btn btn-success">點我創建商店</button>
                <button type="reset" class="btn btn-danger">重新填寫</button>
            </div> 
        </div>
    </form>
    <h3 class="mb-3">商店預覽</h3>
    <StoreInfo :store="store" :own-link="store.icon"/>
</template>