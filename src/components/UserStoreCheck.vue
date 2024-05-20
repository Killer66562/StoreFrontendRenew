<script setup lang="ts">
import LoginCheck from './LoginCheck.vue';
import { useUserDataStore } from '../stores';
import { useUserStoreStore } from '../stores/userStoreStore';
import { storeToRefs } from 'pinia';

const userDatastore = useUserDataStore();
const { userData } = storeToRefs(userDatastore);


const emits = defineEmits<{
    notLogin: [],
    hasStore: [],
    hasNoStore: []
}>();
</script>

<template>
    <LoginCheck>
        <template #notLogin v-if="!userData"></template>
    </LoginCheck>
</template>