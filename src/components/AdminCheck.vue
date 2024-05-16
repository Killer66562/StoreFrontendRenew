<script setup lang="ts">
import LoginCheck from './LoginCheck.vue';
import { storeToRefs } from 'pinia';
import { useUserDataStore } from '../stores';
import { onBeforeMount } from 'vue';

const userDatastore = useUserDataStore();
const { userData } = storeToRefs(userDatastore);

const emits = defineEmits<{
    isLogin: [],
    notLogin: [],
    isAdmin: [],
    notAdmin: []
}>();

const onReady = () => {
    if (userDatastore.userData) {
        if (userDatastore.userData.is_admin)
            emits("isAdmin");
        else
            emits("notAdmin");
    }
}

onBeforeMount(() => {
    if (userDatastore.userData) {
        if (userDatastore.userData.is_admin)
            emits("isAdmin");
        else
            emits("notAdmin");
    }
});
</script>

<template>
    <LoginCheck @is-login="emits('isLogin')" @not-login="emits('notLogin')" @ready="onReady">
        <slot name="notLogin" v-if="!userData"></slot>
        <slot name="notAdmin" v-else-if="userData.is_admin"></slot>
        <slot></slot>
    </LoginCheck>
</template>