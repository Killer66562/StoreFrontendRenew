<script setup lang="ts">
import TriState from './TriState.vue';
import { useUserDataStore } from '../stores';
import { useRootStore } from '../stores/rootStore';
import { router } from '../routes';

const rootStore = useRootStore();
const userDataStore = useUserDataStore();

const props = defineProps<{
    useOwnNotLoginHandler?: boolean
}>();

const emits = defineEmits<{
    isLogin: [],
    notLogin: [],
    ready: []
}>();

const notLoginHandler = async () => {
    await router.replace("/");
}

const onReady =  async () => {
    if (userDataStore.userData)
        emits("isLogin");
    else {
        if (props.useOwnNotLoginHandler === true)
            emits("notLogin");
        else
            await notLoginHandler();
    }
}

const handler = async () => {
    if (rootStore.isReady)
        onReady();
    else if (rootStore.error) {
        if (props.useOwnNotLoginHandler === true)
            emits("notLogin");
        else
            await notLoginHandler();
    }
}

handler();
</script>

<template>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error" @ready="onReady" @error="emits('notLogin')">
        <template #loading>
            <slot name="loading">
                <h2 class="text-center">載入中。。。</h2>
            </slot>
        </template>
        <template #ready>
            <slot name="notLogin" v-if="userDataStore.userData === undefined"></slot>
            <slot v-else></slot>
        </template>
        <template #error>
            <slot name="notLogin"></slot>
        </template>
    </TriState>
</template>