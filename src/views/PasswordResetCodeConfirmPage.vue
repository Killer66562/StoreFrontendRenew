<script setup lang="ts">
import { ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { PasswordResetCodeSchema } from '../models';
import { useToast } from 'vue-toast-notification';
import { getErrorMessage } from '../funcs';
import { useAsyncState } from '@vueuse/core';
import LoginCheck from '../components/LoginCheck.vue';
import { router } from '../routes';

const toast = useToast();

const data = ref<PasswordResetCodeSchema>({
    code: ""
})

const reset = () => {
    data.value = {
        code: ""
    }
}

const sendData = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.post("/forget_password_code_confirm", data.value);
        reset();
        toast.success("密碼已重設！");
        await router.replace("/login");
    }
    catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
    }
}

const sendState = useAsyncState(() => sendData(), undefined, { immediate: false });

const goBack = async () => {
    await router.replace("/");
}
</script>

<template>
    <LoginCheck use-own-not-login-handler @is-login="goBack">
        <template #notLogin>
            <h2 class="text-center">密碼重設驗證</h2>
            <form @submit.prevent="sendState.execute" @reset.prevent="reset">
                <div class="row">
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-8">
                        <div class="mb-3">
                            <h5>請輸入密碼重設代碼</h5>
                            <h5>驗證成功後</h5>
                            <h5>我們會寄送重設過後的密碼到你的電子信箱中</h5>
                            <label class="form-label">密碼重設代碼</label>
                            <input type="text" class="form-control" placeholder="請輸入密碼重設代碼" required v-model="data.code">
                        </div>
                        <div class="btn-group">
                            <button type="submit" class="btn btn-success" :disabled="sendState.isLoading.value">發送密碼重設代碼</button>
                            <button type="reset" class="btn btn-danger">重新填寫</button>
                        </div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                </div>
            </form>
        </template>
    </LoginCheck>
</template>