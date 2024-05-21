<script setup lang="ts">
import { computed, ref } from 'vue';
import AdminCheck from '../components/AdminCheck.vue';
import { PageSchema, UserQuerySchema, UserSchema } from '../models';
import { ApiInstance } from '../api';
import { useAsyncState } from '@vueuse/core';

const sortByAvaliable = [
    {name: "ID", value: "id"},
    {name: "使用者名稱", value: "username"},
    {name: "電子郵件", value: "email"},
    {name: "生日", value: "birthday"},
    {name: "帳號創建日期", value: "created_at"},
];

const data = ref<UserSchema[]>();
const page = ref<number>(1);
const pages = ref<number>(Infinity);

const query = ref<UserQuerySchema>({
    desc: false,
    sort_by: "id"
});

const resetQuery = () => {
    query.value = {
        desc: false,
        sort_by: "id"
    }
}

const resetData = () => {
    page.value = 1;
    pages.value = Infinity;
    sendQueryState.execute();
}

const checkboxOnChange = () => {
    query.value.desc = (query.value.desc === true) ? false : true;
}

const canFirstPage = computed<boolean>(() => page.value > 1);
const canPrevPage = computed<boolean>(() => page.value > 1);
const canNextPage = computed<boolean>(() => page.value < pages.value && pages.value != Infinity);
const canLastPage = computed<boolean>(() => page.value < pages.value && pages.value != Infinity);

const sendQuery = async () => {
    if (query.value.username?.length == 0)
        query.value.username = undefined;
    if (query.value.email?.length == 0)
        query.value.email = undefined;

    const apiInstance = new ApiInstance();
    const paginatedData: PageSchema<UserSchema> = await apiInstance.get("/admin/users", { ...query.value, page: page.value });
    data.value = paginatedData.items;
    page.value = paginatedData.page;
    pages.value = paginatedData.pages;
    console.log(data.value);
}

const sendQueryState = useAsyncState(() => sendQuery(), undefined, { immediate: false });

const firstPage = async () => {
    if (canFirstPage.value)
        sendQueryState.execute();
}

const prevPage = async () => {
    if (canPrevPage.value)
        sendQueryState.execute();
}

const nextPage = async () => {
    if (canNextPage.value)
        sendQueryState.execute();
}

const LastPage = async () => {
    if (canLastPage.value)
        sendQueryState.execute();
}

sendQueryState.execute();
</script>

<template>
    <AdminCheck>
        <form @submit.prevent="sendQueryState.execute" @reset.prevent="resetQuery">
            <div class="row">
                <div class="col-12 col-md-6 mb-3">
                    <label class="form-label">使用者名稱</label>
                    <input type="text" class="form-control" v-model="query.username">
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <label class="form-label">電子郵件</label>
                    <input type="text" class="form-control" v-model="query.email">
                </div>
                <div class="col-12 col-md-3 mb-3">
                    <label class="form-label">生日(從)</label>
                    <input type="text" class="form-control" v-model="query.birthday_start">
                </div>
                <div class="col-12 col-md-3 mb-3">
                    <label class="form-label">生日(到)</label>
                    <input type="text" class="form-control" v-model="query.birthday_end">
                </div>
                <div class="col-12 col-md-3 mb-3">
                    <label class="form-label">創建日期(從)</label>
                    <input type="text" class="form-control" v-model="query.created_at_start">
                </div>
                <div class="col-12 col-md-3 mb-3">
                    <label class="form-label">創建日期(到)</label>
                    <input type="text" class="form-control" v-model="query.created_at_end">
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <label class="form-label">倒序排列</label>
                    <input class="form-check-input" type="checkbox"  v-model="query.desc">
                </div>
                <div class="d-flex flex-row justify-content-end">
                    <div class="mb-3">
                        <label class="form-label">排序方式</label>
                        <select class="form-select" v-model="query.sort_by">
                            <option v-for="sortBy in sortByAvaliable" :key="sortBy.value" :value="sortBy.value">{{ sortBy.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="btn btn-group mb-3">
                    <button type="submit" class="btn btn-success">送出查詢</button>
                    <button type="reset" class="btn btn-danger">重新填寫</button>
                </div>
            </div>
        </form>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-1">ID</th>
                        <th class="col-2">使用者名稱</th>
                        <th class="col-4">電子郵件</th>
                        <th class="col-2">生日</th>
                        <th class="col-2">帳號創建時間</th>
                        <th class="col-1">管理員？</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in data" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.birthday }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>{{ user.is_admin }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminCheck>
</template>