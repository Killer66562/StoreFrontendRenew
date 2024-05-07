<script setup lang="ts">
import StoreInfo from '../components/StoreInfo.vue';
import { useUserStoreStore } from '../stores/userStoreStore';
const userStoreStore = useUserStoreStore();
</script>

<template>
    <template v-if="userStoreStore.userStore === undefined">
        <h3 class="text-center">你還沒創建商店喔</h3>
    </template>
    <template v-else>
        <StoreInfo :store="userStoreStore.userStore" />
    </template>
</template>