<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
    loading: boolean,
    ready: boolean,
    error: any
}>();

const emits = defineEmits<{
    loading: [],
    ready: [],
    error: []
}>();

watch(props, () => {
    if (props.loading)
        emits("loading");
    else if (props.ready)
        emits("ready");
    else if (props.error)
        emits("error");
})
</script>

<template>
    <slot name="loading" v-if="loading"></slot>
    <slot name="ready" v-else-if="ready"></slot>
    <slot name="error" v-else-if="error"></slot>
    <slot v-else></slot>
</template>