<script setup lang="ts">
import { useRootStore } from '../stores/rootStore';
import TriState from './TriState.vue';

const rootStore = useRootStore();
</script>

<template>
    <TriState :loading="rootStore.isLoading" :ready="rootStore.isReady" :error="rootStore.error">
        <template #loading>
            <slot name="loading">
                <h3 class="text-center">讀取中。。。</h3>
            </slot>
        </template>
        <template #ready>
            <slot name="ready"></slot>
        </template>
        <template #error>
            <slot name="error">
                <h3 class="text-center">讀取失敗。請重新整理頁面。</h3>
            </slot>
        </template>
    </TriState>
</template>