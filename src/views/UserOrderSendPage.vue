<script setup lang="ts">
import { useUserCreateOrdersStore } from '../stores/userCreateOrdersStore';
import LoginCheck from '../components/LoginCheck.vue';
import CreateOrderRow from '../components/CreateOrderRow.vue'

const userCreateOrdersStore = useUserCreateOrdersStore();
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">訂單送出確認</h2>
        <form @submit.prevent="">
            <CreateOrderRow :order="order" v-for="order in userCreateOrdersStore.orders" :key="order.cartItem.id" />
        </form>
    </LoginCheck>
</template>