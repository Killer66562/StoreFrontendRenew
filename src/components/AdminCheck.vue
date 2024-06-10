<script setup lang="ts">
import LoginCheck from './LoginCheck.vue';
import { storeToRefs } from 'pinia';
import { useUserDataStore } from '../stores';
import { router } from '../routes';

const userDatastore = useUserDataStore();
const { userData } = storeToRefs(userDatastore);

const props = defineProps<{
    useOwnNotLoginHandler?: boolean,
    useOwnNotAdminHandler?: boolean,
}>();

const emits = defineEmits<{
    notLogin: [],
    isAdmin: [],
    notAdmin: []
}>();

const notAdminHandler = async () => {
    await router.replace("/");
}

const onIsLogin = async () => {
    if (userDatastore.userData) {
        if (userDatastore.userData.is_admin)
            emits("isAdmin");
        else {
            if (props.useOwnNotAdminHandler)
                emits("notAdmin");
            else
                await notAdminHandler();
        }
    }
}
</script>

<template>
    <LoginCheck @is-login="onIsLogin" @not-login="emits('notLogin')" :use-own-not-login-handler="useOwnNotLoginHandler">
        <slot name="notLogin" v-if="!userData"></slot>
        <slot name="notAdmin" v-else-if="!userData.is_admin"></slot>
        <slot></slot>
    </LoginCheck>
</template>