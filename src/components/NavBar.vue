<script setup lang="ts">
import { router } from '../routes';
import LoginCheck from '../components/LoginCheck.vue';
import { useToast } from 'vue-toast-notification';
import { useRootStore } from '../stores/rootStore';
import { useSearchStore } from '../stores/searchStore';

const rootStore = useRootStore();
const searchStore = useSearchStore();

const search = async () => {
    searchStore.searchNow = true;
    await router.push("/items");
}

const logout = async () => {
    rootStore.reset();
    const toast = useToast();
    await router.replace("/");
    toast.success("登出成功");
}
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-warning bg-warning">
        <div class="container">
            <RouterLink to="/" class="navbar-brand">
                <h1 class="fs-2">👐🏻🛍️</h1>
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ms-auto mb-1 mb-lg-0 text-dark">
                    <LoginCheck use-own-not-login-handler>
                        <template #loading>正在讀取資料。。。</template>
                        <li class="nav-item">
                            <RouterLink to="/user/liked-items" class="nav-link active text-center">
                                <img class="nav-brand" src="/src/assets/heart.png" alt="願望清單" height="24" width="24">
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/user/cart-items" class="nav-link active text-center">
                                <img class="nav-brand" src="../assets/cart.png" alt="購物車" height="24" width="24">
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/user/orders" class="nav-link active text-center">
                                <img class="nav-brand" src="../assets/record.png" alt="訂單一覽" height="24" width="24">
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/user/store" class="nav-link active text-center">
                                <img class="nav-brand" src="../assets/store.png" alt="我的商店" height="24" width="24">
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/user" class="nav-link active text-center">
                                <img class="nav-brand" src="../assets/user.png" alt="個人資訊" height="24" width="24">
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <LoginCheck use-own-not-login-handler>
                                <RouterLink to="/" class="nav-link active text-center" @click="logout">登出</RouterLink>
                                <template #notLogin>
                                    <RouterLink class="nav-link active text-center" to="/login">註冊｜登入</RouterLink>
                                </template>
                            </LoginCheck>
                        </li>
                        <template #notLogin>
                            <RouterLink class="nav-link active text-center" to="/login">註冊｜登入</RouterLink>
                        </template>
                    </LoginCheck>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container-fluid bg-warning pb-1">
        <div class="container">
            <div class="input-group mb-3">
                <span class="input-group-text">全站搜尋</span>
                <input type="text" class="form-control" placeholder="找商品？" v-model="searchStore.query.name">
                <button class="btn btn-success" type="button" @click="search" :disabled="searchStore.searchNow === true">GO</button>
            </div>
        </div>
    </div>
</template>