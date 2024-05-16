<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';
import { LoginSchema } from '../models';
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useUserDataStore } from '../stores';
import { useToast } from 'vue-toast-notification';
const userDataStore = useUserDataStore();
const data = ref<LoginSchema>({
    username: "",
    password: ""
});
const sendData = async () => {
    try {
        await userDataStore.login(data.value);
    }
    catch (err) {
        const toast = useToast();
        toast.error("登入失敗，帳號或密碼錯誤。", { position: "bottom" });
        throw err;
    }
}
const sendDataState = useAsyncState(() => sendData(), undefined, { immediate: false });
const resetData = () => {
    data.value = {
        username: "",
        password: ""
    }
}
</script>

<template>
    <LoginCheck @is-login="router.back()">
        <template #default></template>
        <template #notLogin>
            <h2 class="text-center mb-3">登入</h2>
            <div class="row">
                <div class="col-12 col-md-4"></div>
                <div class="col-12 col-md-4">
                    <form @submit.prevent="sendDataState.execute" @reset.prevent="resetData" class="mb-3">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" placeholder="請輸入使用者名稱" v-model="data.username" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" placeholder="請輸入密碼" v-model="data.password" required>
                        </div>
                        <div class="btn-group mb-3">
                            <button type="submit" class="btn btn-success">送出</button>
                            <button type="reset" class="btn btn-danger">重新填寫</button>
                        </div>
                        <div>
                            <RouterLink to="/register">尚無帳號？註冊</RouterLink>
                        </div>
                    </form>
                    <div>
                        <a href="https://ncuesaweb.ncue.edu.tw/linux"><img class="img-fluid h-100" src="/src/assets/linux.png" alt="ncuesa-linux-mirror"></a>
                    </div>
                </div> 
                <div class="col-12 col-md-4"></div>
            </div>
        </template>
    </LoginCheck>
</template>