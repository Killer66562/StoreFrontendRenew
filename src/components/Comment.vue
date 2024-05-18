<script setup lang="ts">
import { FullCommentSchema } from '../models';
defineProps<{
    comment: FullCommentSchema
}>();
import { getStaticFile } from '../funcs';
</script>

<template>
    <div class="row">
        <div class="col-1">
            <RouterLink :to="`/users/${comment.user.id}`">
                <img class="img-fluid h-100" style="aspect-ratio: 1 /1;" :src="getStaticFile(comment.user.username)" alt="user-icon" v-if="comment.user.username">
                <img class="img-fluid h-100" style="aspect-ratio: 1 /1;" src="/src/assets/user.png" alt="user-icon" v-else>
            </RouterLink>
        </div>
        <div class="col-11">
            <div class="fw-bold">{{ comment.user.username }}</div>
            <div>{{ comment.content }}</div>
        </div>
    </div>
</template>