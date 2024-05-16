<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserDataStore } from '../stores';
const userDatastore = useUserDataStore();
const { userData } = storeToRefs(userDatastore);

const emits = defineEmits<{
    isLogin: [],
    notLogin: []
}>();

if (userDatastore.userData)
    emits("isLogin");
else
    emits("notLogin");

console.log(userDatastore.userData);
</script>

<template>
    <slot name="notLogin" v-if="userData === undefined"></slot>
    <slot v-else></slot>
</template>