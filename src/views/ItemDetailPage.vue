<script setup lang="ts">
import { FullCommentSchema, FullItemSchema, PageSchema } from '../models';
import { router } from '../routes';
import ItemInfo from '../components/ItemInfo.vue';
import TriState from '../components/TriState.vue';
import { computed, ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { useAsyncState } from '@vueuse/core';
import StoreInfo from '../components/StoreInfo.vue';
import CommentBoard from '../components/CommentBoard.vue';

const item = ref<FullItemSchema>();
const comments = ref<FullCommentSchema[]>([]);

const page = ref<number>(1);
const pages = ref<number>(Infinity);
const commentCount = ref<number | undefined>(0);

const fetchItem = async () => {
    if (router.currentRoute.value.params.itemId) {
        const apiInstance = new ApiInstance();
        item.value = await apiInstance.get(`/general/items/${router.currentRoute.value.params.itemId}`);
    }
}

const resetComments = () => {
    comments.value = [];
    page.value = 1;
    pages.value = Infinity;
}

const fetchComments = async () => {
    if (router.currentRoute.value.params.itemId) {
        const apiInstance = new ApiInstance();
        const newComments: PageSchema<FullCommentSchema> = await apiInstance.get(`/general/items/${router.currentRoute.value.params.itemId}/comments`, { page: page.value, size: 20 });
        comments.value.push(...newComments.items);
        commentCount.value = newComments.total
        pages.value = newComments.pages;
        page.value++;
    }
}

const fetchState = useAsyncState(() => fetchItem(), undefined, { immediate: false });
const fetchCommentState = useAsyncState(() => fetchComments(), undefined, { immediate: false });

fetchState.execute();
fetchCommentState.execute();

const commentsUpdate = () => {
    resetComments();
    fetchCommentState.execute();
}

const canLoadMore = computed<boolean>(() => {
    return page.value <= pages.value;
})
</script>

<template>
    <TriState :loading="fetchState.isLoading.value" :ready="fetchState.isReady.value" :error="fetchState.error.value">
        <template #loading>
            <h3 class="text-center">載入中。。。</h3>
        </template>
        <template #ready>
            <template v-if="item">
                <ItemInfo :item="item"/>
                <StoreInfo :store="item.store" />
                <h4>留言板</h4>
                <p>共 {{ commentCount }} 則留言</p>
                <CommentBoard :comments="comments" :item="item" @comments-upudate="commentsUpdate"/>
                <div class="row">
                    <TriState :loading="fetchCommentState.isLoading.value" :ready="fetchCommentState.isReady.value" :error="fetchCommentState.error.value">
                        <template #ready>
                            <button type="button" class="btn btn-lg btn-warning" @click="fetchCommentState.execute" v-if="canLoadMore" :disabled="fetchCommentState.isLoading.value">載入更多留言</button>
                        </template>
                        <template #error>
                            <button type="button" class="btn btn-lg btn-warning" @click="fetchCommentState.execute" v-if="canLoadMore" :disabled="fetchCommentState.isLoading.value">載入失敗，請重試。</button>
                        </template>
                    </TriState>
                </div>
            </template>
            <h3 class="text-center" v-else>商品不存在</h3>
        </template>
        <template #error>
            <h3 class="text-center">商品不存在</h3>
        </template>
    </TriState>
</template>