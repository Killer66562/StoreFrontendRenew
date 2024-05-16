<script setup lang="ts">
import LoginCheck from './LoginCheck.vue';
import { storeToRefs } from 'pinia';
import { useUserDataStore } from '../stores';

const userDatastore = useUserDataStore();
const { userData } = storeToRefs(userDatastore);

const emits = defineEmits<{
    notLogin: [],
    isAdmin: [],
    notAdmin: []
}>();

const onIsLogin = () => {
    if (userDatastore.userData) {
        if (userDatastore.userData.is_admin)
            emits("isAdmin");
        else
            emits("notAdmin");
    }
}
</script>

<template>
    <LoginCheck @is-login="onIsLogin" @not-login="emits('notLogin')">
        <slot name="notLogin" v-if="!userData"></slot>
        <slot name="notAdmin" v-else-if="userData.is_admin"></slot>
        <slot></slot>
    </LoginCheck>
</template>