<script setup lang="ts">
import { ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { PasswordResetSchema } from '../models';
import { useToast } from 'vue-toast-notification';
import { getErrorMessage } from '../funcs';
import { useAsyncState } from '@vueuse/core';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';

const toast = useToast();

const data = ref<PasswordResetSchema>({
    email: ""
})

const reset = () => {
    data.value = {
        email: ""
    }
}

const sendData = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/forget_password", data.value);
        reset();
        await gotoConfirmPage();
        toast.success("郵件已送出！");
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const sendState = useAsyncState(() => sendData(), undefined, { immediate: false });

const gotoConfirmPage = async () => {
    await router.replace("/forget-password-confirm");
}

const goBack = async () => {
    await router.replace("/");
}
</script>

<template>
    <LoginCheck use-own-not-login-handler @is-login="goBack">
        <template #notLogin>
            <h2 class="text-center">忘記密碼？</h2>
            <form @submit.prevent="sendState.execute" @reset.prevent="reset">
                <div class="row">
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-8">
                        <div class="mb-3">
                            <h5>請輸入您的電子郵件信箱</h5>
                            <h5>我們會寄送一封確認郵件到你的電子信箱中</h5>
                            <label class="form-label">電子郵件</label>
                            <input type="email" class="form-control" placeholder="請輸入電子郵件" required v-model="data.email">
                        </div>
                        <div class="btn-group">
                            <button type="submit" class="btn btn-success" :disabled="sendState.isLoading.value">發送重設密碼確認信</button>
                            <button type="reset" class="btn btn-danger">重新填寫</button>
                        </div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                </div>
            </form>
        </template>
    </LoginCheck>
</template>