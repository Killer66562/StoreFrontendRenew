<script setup lang="ts">
import { useCitiesStore } from '../stores/citiesStore';
import { CitySchema, AdminCUCitySchema } from '../models';
import { ref } from 'vue';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';
import AdminCheck from '../components/AdminCheck.vue';
import { router } from '../routes';

const staticData = ref<CitySchema>();
const data = ref<AdminCUCitySchema>({
    name: ""
});

const resetDataRaw = () => {
    staticData.value = undefined;
    data.value = {
        name: ""
    }
}

const resetData = () => {
    if (staticData.value)
        data.value = {...staticData.value};
    else
        resetDataRaw();
}

const setData = (dt: CitySchema) => {
    staticData.value = dt;
    data.value = {...dt};
}

const sendData = async () => {
    const apiInstance = new ApiInstance();
    if (staticData.value)
        await apiInstance.put(`/admin/cities/${staticData.value.id}`, data.value);
    else
        await apiInstance.post(`/admin/cities`, data.value);
    resetDataRaw();
    try {
        await citiesStore.fetchData();
    }
    catch (err) {}
}

const citiesStore = useCitiesStore();

const sendState = useAsyncState(() => sendData(), undefined, { immediate: false });

const onNotAdmin = async () => {
    await router.replace("/404");
}

const onNotLogin = async () => {
    await router.replace("/login");
}
</script>

<template>
    <AdminCheck @not-admin="onNotAdmin" @not-login="onNotLogin">
        <form @submit.prevent="sendState.execute" @reset.prevent="resetData">
            <div class="row">
                <div class="col-12 col-md-4 mb-3">
                    <label class="form-label">城市名稱</label>
                    <input type="text" class="form-control" required maxlength="20" v-model="data.name">
                </div>
            </div>
            <div class="btn-group mb-3">
                <button type="submit" class="btn btn-success">送出</button>
                <button type="reset" class="btn btn-secondary">重新填寫</button>
                <button type="button" class="btn btn-danger" v-if="staticData">刪除</button>
                <button type="button" class="btn btn-secondary" v-if="staticData" @click="resetDataRaw">取消編輯</button>
            </div>
        </form>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-1">ID</th>
                        <th class="col-9">名稱</th>
                        <th class="col-2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="city in citiesStore.citiesData" :key="city.id">
                        <td>{{ city.id }}</td>
                        <td>{{ city.name }}</td>
                        <td>
                            <button type="button" class="btn btn-danger" @click="setData(city)" :disabled="staticData == city">編輯</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminCheck>
</template>