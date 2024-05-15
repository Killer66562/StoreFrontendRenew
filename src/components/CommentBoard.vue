<script setup lang="ts">
import Comment from './Comment.vue';
import { CUCommentSchema, FullCommentSchema, ItemSchema } from '../models';
import { getStaticFile } from '../funcs';
import { useUserDataStore } from '../stores';
import { ref } from 'vue';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';

const props = defineProps<{
    item: ItemSchema
    comments: FullCommentSchema[]
}>();

const emits = defineEmits<{
    commentsUpudate: []
}>();

const userDataStore = useUserDataStore();

const data = ref<CUCommentSchema>({
    content: ""
});

const sendComment = async () => {
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.put(`/items/${props.item.id}/comments`, data.value);
        emits("commentsUpudate");
    }
    catch (err) {
        throw err;
    }
}

const sendState = useAsyncState(() => sendComment(), undefined, { immediate: false });
</script>

<template>
    <div class="row">
        <div class="col-2">
            <img class="img-fluid h-100" style="aspect-ratio: 1 /1;" :src="getStaticFile(userDataStore.userData.username)" alt="user-icon" v-if="userDataStore.userData">
            <img class="img-fluid h-100" style="aspect-ratio: 1 /1;" src="/src/assets/user.png" alt="user-icon" v-else>
        </div>
        <div class="col-10">
            <form @submit.prevent="sendState.execute" @reset.prevent="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="請輸入留言" v-model="data.content">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">送出</button>
                    </div>
                </div>
                <div></div>
            </form>
        </div>
    </div>
    <Comment :comment="comment" v-for="comment in comments" :key="comment.id"/>
</template>