<script setup lang="ts">
import TriState from './TriState.vue';
import { useUserDataStore } from '../stores';
import { useRootStore } from '../stores/rootStore';
import { onBeforeMount } from 'vue';

const rootStore = useRootStore();
const userDataStore = useUserDataStore();

const emits = defineEmits<{
    isLogin: [],
    notLogin: [],
    ready: []
}>();

const onReady = () => {
    emits("ready");
    if (userDataStore.userData)
        emits("isLogin");
    else
        emits("notLogin");
}

const onError = () => {
    emits("notLogin");
}

onBeforeMount(() => {
    if (rootStore.isReady) {
        if (userDataStore.userData)
            emits("isLogin");
        else
            emits("notLogin");
    }

    if (rootStore.error)
        emits("notLogin");
});
</script>

<template>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error" @ready="onReady" @error="onError">
        <template #loading></template>
        <template #ready>
            <slot name="notLogin" v-if="!userDataStore.userData"></slot>
            <slot v-else></slot>
        </template>
        <template #error>
            <slot name="notLogin"></slot>
        </template>
    </TriState>
</template>