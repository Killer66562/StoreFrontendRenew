<script setup lang="ts">
import LoginCheck from '../components/LoginCheck.vue';
import StoreInfo from '../components/StoreInfo.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
const userStoreStore = useUserStoreStore();
</script>

<template>
    <LoginCheck>
        <StoreInfo :store="userStoreStore.userStoreData" />
        <template #notLogin>Test</template>
    </LoginCheck>
</template>