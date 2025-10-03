<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';
import { RegisterSchema } from '../models';
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useToast } from 'vue-toast-notification';
import { ApiInstance } from '../api/apiInstance';
import { getErrorMessage } from '../funcs';
const data = ref<RegisterSchema>({
    username: "",
    email: "",
    password: "",
    birthday: new Date(),
    icon: null
});
const sendData = async () => {
    const apiInstance = new ApiInstance();
    const toast = useToast();
    try {
        await apiInstance.post("/register", data.value);
        toast.success("註冊成功！");
        await router.replace("/login");
        toast.info("已將您重新導向登入頁面。");
    }
    catch (err) {
        const errMessage = getErrorMessage(err);
        toast.error(errMessage);
        throw err;
    }
}
const sendDataState = useAsyncState(() => sendData(), undefined, { immediate: false });
const resetData = () => {
    data.value = {
        username: "",
        password: "",
        email: "",
        birthday: new Date(),
        icon: null
    }
}
</script>

<template>
    <LoginCheck @is-login="router.back()" use-own-not-login-handler>
        <template #default></template>
        <template #notLogin>
            <h2 class="text-center mb-3">註冊</h2>
            <div class="row">
                <div class="col-12 col-md-4"></div>
                <div class="col-12 col-md-4">
                    <form @submit.prevent="sendDataState.execute" @reset.prevent="resetData" class="mb-3">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" placeholder="請輸入使用者名稱" v-model="data.username" required maxlength="20">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" placeholder="請輸入電子郵件" v-model="data.email" required maxlength="200">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" placeholder="請輸入密碼" v-model="data.password" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Birthday</label>
                            <input type="date" class="form-control" placeholder="請輸入生日" v-model="data.birthday" required>
                        </div>
                        <div class="btn-group mb-3">
                            <button type="submit" class="btn btn-success">送出</button>
                            <button type="reset" class="btn btn-danger">重新填寫</button>
                        </div>
                        <div>
                            <RouterLink to="/login">已有帳號？登入</RouterLink>
                        </div>
                    </form>
                </div> 
                <div class="col-12 col-md-4"></div>
            </div>
        </template>
    </LoginCheck>
</template>