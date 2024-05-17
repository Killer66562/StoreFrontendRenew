<script setup lang="ts">
import TriState from './TriState.vue';
import { useUserDataStore } from '../stores';
import { useRootStore } from '../stores/rootStore';

const rootStore = useRootStore();
const userDataStore = useUserDataStore();

const emits = defineEmits<{
    isLogin: [],
    notLogin: [],
    ready: []
}>();

const onReady = () => {
    if (userDataStore.userData)
        emits("isLogin");
    else
        emits("notLogin");
}

const handler = () => {
    if (rootStore.isReady)
        onReady();
    else if (rootStore.error)
        emits("notLogin");
}

handler();
</script>

<template>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error" @ready="onReady" @error="emits('notLogin')">
        <template #loading></template>
        <template #ready>
            <slot name="notLogin" v-if="userDataStore.userData === undefined"></slot>
            <slot v-else></slot>
        </template>
        <template #error>
            <slot name="notLogin"></slot>
        </template>
    </TriState>
</template>