<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
import { router } from '../routes';
const userStoreStore = useUserStoreStore();
const gotoLoginPage = async () => {
    await router.replace("/login");
}
</script>

<template>
    <LoginCheck @not-login="gotoLoginPage">
        <template #default>
            <StoreInfo :store="userStoreStore.userStore" />
        </template>
        <template #notLogin>Test</template>
    </LoginCheck>
</template>