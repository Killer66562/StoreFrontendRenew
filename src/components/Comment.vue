<script setup lang="ts">
import { FullCommentSchema } from '../models';
defineProps<{
    comment: FullCommentSchema
}>();
import { getStaticFile } from '../funcs';
</script>

<template>
    <div class="row">
        <div class="col-3 col-md-2 col-xl-1">
            <RouterLink :to="`/users/${comment.user.id}`">
                <img class="img-fluid" style="aspect-ratio: 1 /1;" :src="getStaticFile(comment.user.icon)" alt="user-icon" v-if="comment.user.icon">
                <img class="img-fluid" style="aspect-ratio: 1 /1;" src="/src/assets/user.png" alt="user-icon" v-else>
            </RouterLink>
        </div>
        <div class="col-9 col-md-10 col-xl-11">
            <div class="fw-bold">{{ comment.user.username }}</div>
            <VRating color="warning" length="5" :model-value="comment.stars" size="tiny" readonly/>
            <div>{{ comment.content }}</div>
        </div>
    </div>
</template>