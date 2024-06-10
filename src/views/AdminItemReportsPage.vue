<script setup lang="ts">
import { computed, ref } from 'vue';
import AdminCheck from '../components/AdminCheck.vue';
import ItemReportRow from '../components/ItemReportRow.vue';
import { ItemReportSchema, PageSchema } from '../models';
import { ApiInstance } from '../api/apiInstance';
import { useAsyncState } from '@vueuse/core';

const data = ref<ItemReportSchema[]>();
const page = ref<number>(1);
const pages = ref<number>(Infinity);

const canFirstPage = computed<boolean>(() => page.value > 1);
const canPrevPage = computed<boolean>(() => page.value > 1);
const canNextPage = computed<boolean>(() => page.value < pages.value && pages.value != Infinity);
const canLastPage = computed<boolean>(() => page.value < pages.value && pages.value != Infinity);


const sendQuery = async () => {

    const apiInstance = new ApiInstance();
    const paginatedData: PageSchema<ItemReportSchema> = await apiInstance.get("/admin/item_reports", { page: page.value });
    data.value = paginatedData.items;
    page.value = paginatedData.page;
    pages.value = paginatedData.pages;
}

const sendQueryState = useAsyncState(() => sendQuery(), undefined, { immediate: false });

const firstPage = async () => {
    if (canFirstPage.value) {
        page.value = 1;
        sendQueryState.execute();
    }
}

const prevPage = async () => {
    if (canPrevPage.value) {
        page.value--;
        sendQueryState.execute();
    }
}

const nextPage = async () => {
    if (canNextPage.value) {
        page.value++;
        sendQueryState.execute();
    }
}

const lastPage = async () => {
    if (canLastPage.value) {
        page.value = pages.value;
        sendQueryState.execute();
    }
}

sendQueryState.execute();
</script>

<template>
    <AdminCheck>
        <div class="d-flex flex-row justify-content-center mb-3">
            <div class="btn-group">
                <button type="button" class="btn btn-danger" @click="firstPage" :disabled="!canFirstPage">回第一頁</button>
                <button type="button" class="btn btn-warning" @click="prevPage" :disabled="!canPrevPage">上一頁</button>
                <button type="button" class="btn btn-warning" @click="nextPage" :disabled="!canNextPage">下一頁</button>
                <button type="button" class="btn btn-danger" @click="lastPage" :disabled="!canLastPage">最後一頁</button>
            </div>
        </div>
        <div class="row pt-1 pb-1">
            <div class="col-9 col-sm-10 col-md-10">
                <div class="row">
                    <div class="col-4 col-sm-3 col-md-2 col-lg-1"></div>
                    <div class="col-5 col-sm-7 col-md-8 col-lg-9 pt-4">
                        <div class="row">
                            <div class="col-2">
                                <h5 class="text-start text-dark text-truncate">商品名稱</h5>
                            </div>
                            <div class="col-8">
                                <h5 class="text-start text-dark text-truncate">檢舉原因</h5>
                            </div>
                            <div class="col-2">
                                <h5 class="text-start text-dark text-truncate">檢舉人</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ItemReportRow v-for="itemReport in data" :key="itemReport.id" :item-report="itemReport" />
    </AdminCheck>
</template>