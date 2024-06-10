<script setup lang="ts">
import { ItemReportSchema } from '../models';
import { getStaticFile } from '../funcs';

defineProps<{
    itemReport: ItemReportSchema
}>();
</script>

<template>
    <div class="row pt-1 pb-1">
        <div class="col-9 col-sm-10 col-md-10">
            <RouterLink :to="`/items/${itemReport.reported_item_id}`" class="text-decoration-none">
                <div class="row">
                    <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                        <img class="img-fluid" :src="getStaticFile(itemReport.reported_item.icon)" :alt="`ItemReport #${itemReport.id}`" v-if="itemReport.reported_item.icon" style="aspect-ratio: 1 / 1;">
                        <img class="img-fluid" src="/src/assets/item.jpg" :alt="`LikedItem #${itemReport.id}`" v-else style="aspect-ratio: 1 / 1;">
                    </div>
                    <div class="col-5 col-sm-7 col-md-8 col-lg-9 pt-4">
                        <div class="row">
                            <div class="col-2 text-start fw-bold text-dark text-truncate">{{ itemReport.reported_item.name }}</div>
                            <div class="col-8 text-start fw-bold text-dark text-truncate">{{ itemReport.reason }}</div>
                            <div class="col-2 text-start fw-bold text-dark text-truncate">{{ itemReport.reporter.username }}</div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>