<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import AdminCheck from '../components/AdminCheck.vue';

const toast = useToast();

const isAdminCB = () => {
    toast.success("你是管理員");
}

const notAdminCB = () => {
    toast.error("你不是管理員");
}

const isLoginCB = () => {
    toast.success("你登入了");
}

const notLoginCB = () => {
    toast.error("你沒登入");
}
</script>

<template>
    <AdminCheck @isAdmin="isAdminCB" @notAdmin="notAdminCB" @isLogin="isLoginCB" @notLogin="notLoginCB">
        <template>
            <h2>Hello</h2>
        </template>
        <template #notAdmin>
            <h2 class="text-center">你不是管理員</h2>
        </template>
    </AdminCheck>
</template>