<script setup lang="ts">
import Comment from './Comment.vue';
import { CUCommentSchema, FullCommentSchema, ItemSchema } from '../models';
import { getStaticFile } from '../funcs';
import { useUserDataStore } from '../stores';
import { ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { useAsyncState } from '@vueuse/core';
import LoginCheck from './LoginCheck.vue';

const props = defineProps<{
    item: ItemSchema
    comments: FullCommentSchema[]
}>();

const emits = defineEmits<{
    commentsUpudate: []
}>();

const userDataStore = useUserDataStore();

const data = ref<CUCommentSchema>({
    content: null,
    stars: 5
});

const sendComment = async () => {
    if (data.value.content?.length == 0)
        data.value.content = null;
    const apiInstance = new ApiInstance();
    try {
        await apiInstance.put(`/general/items/${props.item.id}/comments`, data.value);
        emits("commentsUpudate");
    }
    catch (err) {
        throw err;
    }
}

const sendState = useAsyncState(() => sendComment(), undefined, { immediate: false });
</script>

<template>
    <LoginCheck use-own-not-login-handler>
        <div class="row mb-3">
            <div class="col-3 col-md-2 col-xl-1">
                <img class="img-fluid" style="aspect-ratio: 1 /1;" :src="getStaticFile(userDataStore.userData.icon)" alt="user-icon" v-if="userDataStore.userData?.icon">
                <img class="img-fluid" style="aspect-ratio: 1 /1;" src="/src/assets/user.png" alt="user-icon" v-else>
            </div>
            <div class="col-9 col-md-10 col-xl-11">
                <form @submit.prevent="sendState.execute" @reset.prevent="">
                    <div class="mb-3">
                        <VRating length="5" color="warning" v-model="data.stars" @update:model-value="console.log(data)" size="tiny" hover></VRating>
                    </div>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" placeholder="請輸入留言" v-model="data.content">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="submit">送出</button>
                        </div>
                    </div>
                    <div></div>
                </form>
            </div>
        </div>
    </LoginCheck>
    <Comment :comment="comment" v-for="comment in comments" :key="comment.id"/>
</template>