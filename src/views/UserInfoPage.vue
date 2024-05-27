<script setup lang="ts">
import { useUserDataStore } from '../stores';
import { getErrorMessage, getStaticFile } from '../funcs';
import { RegisterSchema } from '../models';
import { computed, ref } from 'vue';
import LoginCheck from '../components/LoginCheck.vue';
import { ApiInstance } from '../api';
import { useToast } from 'vue-toast-notification';

const userDataStore = useUserDataStore();

const iconInput = ref<HTMLInputElement>();

const data = ref<RegisterSchema>({
    username: "",
    email: "",
    password: "",
    birthday: new Date(),
    icon: null
});

const resetData = () => {
    key.value++;
    if (userDataStore.userData !== undefined)
        data.value = {...userDataStore.userData, password: "", icon: null}
    else {
        data.value = {
            username: "",
            email: "",
            password: "",
            birthday: new Date(),
            icon: null
        }
    }
}

const iconOnChange = () => {
    if (iconInput.value?.files)
        data.value.icon = iconInput.value.files.item(0);
    else
        data.value.icon = null;
}

const toast = useToast();

const imgUrl = computed<string | null>(() => {
    if (data.value.icon)
        return URL.createObjectURL(data.value.icon);
    else
        return null;
});

const key = ref<number>(0);

const sendData = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.put("/user", data.value);
        if (data.value.icon)
            await apiInstance.putForm("/user/icon", { icon: data.value.icon });
        toast.success("更新成功");
        try {
            await userDataStore.fetchUserData();
        }
        catch (err) {}
        resetData();
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const removeIcon = async () => {
    if (userDataStore.userData?.icon) {
        const apiInstance = new ApiInstance();
        try {
            await apiInstance.delete("/user/icon");
            toast.success("大頭貼已移除");
            try {
                await userDataStore.fetchUserData();
            }
            catch (err) {}
        }
        catch (err) {
            toast.error(getErrorMessage(err));
            throw err;
        }
    }
}
</script>

<template>
    <LoginCheck @is-login="resetData">
        <form @submit.prevent="sendData" @reset.prevent="resetData">
            <div class="row">
                <div class="col-12 col-md-4"></div>
                <div class="col-12 col-md-4">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <div class="mb-3">
                                    <img :src="imgUrl" class="img-fluid h-100" style="aspect-ratio: 1 / 1;" v-if="imgUrl !== null">
                                    <img :src="getStaticFile(userDataStore.userData?.icon)" class="img-fluid h-100" style="aspect-ratio: 1 / 1;" v-else-if="userDataStore.userData?.icon">
                                    <img src="/src/assets/user.png" class="img-fluid h-100" style="aspect-ratio: 1 / 1;" v-else>
                                </div>
                            </div>
                            <div class="col-2"></div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">使用者名稱</label>
                            <input type="text" class="form-control" v-model="data.username">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">電子郵件</label>
                            <input type="text" class="form-control" v-model="data.email">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">密碼</label>
                            <input type="password" class="form-control" v-model="data.password" :key="key">
                            <p class="form-text">不填則不更改密碼</p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">大頭貼</label>
                            <input class="form-control" type="file" ref="iconInput" @change="iconOnChange" :key="key">
                        </div>
                        <div class="btn-group mb-3">
                            <button type="submit" class="btn btn-success">更新使用者資料</button>
                            <button type="reset" class="btn btn-danger">重新填寫</button>
                            <button type="button" class="btn btn-danger" @click="removeIcon" :disabled="!userDataStore.userData?.icon">移除大頭貼</button>
                        </div>
                </div>
                <div class="col-12 col-md-4"></div>
            </div>
        </form>
    </LoginCheck>
</template>