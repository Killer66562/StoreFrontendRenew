<script setup lang="ts">
import { useUserCreateOrdersStore } from '../stores/userCreateOrdersStore';
import LoginCheck from '../components/LoginCheck.vue';
import CreateOrderRow from '../components/CreateOrderRow.vue'
import { useToast } from 'vue-toast-notification';
import { useUserOrdersStore } from '../stores/userOrdersStore';
import { router } from '../routes';

const toast = useToast();

const userCreateOrdersStore = useUserCreateOrdersStore();
const ordersStore = useUserOrdersStore();

const fillAddress = (address: string) => {
    userCreateOrdersStore.orders.forEach((order) => {
        order.order.address = address;
    });
}

const sendOrders = async () => {
    try {
        await userCreateOrdersStore.sendOrders();
        toast.success("訂單已送出！");
        try {
            await ordersStore.fetchOrders();
        }
        catch (err) {}
        await router.replace("/user/orders");
    }
    catch (err) {
        toast.error("訂單送出失敗，請重試。");
        throw err;
    }
}
</script>

<template>
    <LoginCheck>
        <h2 class="text-center">訂單送出確認</h2>
        <template v-if="userCreateOrdersStore.orders.length > 0">
            <form @submit.prevent="sendOrders">
                <CreateOrderRow :order="order" v-for="order in userCreateOrdersStore.orders" :key="order.cartItem.id" @fill-address="fillAddress"/>
                <div class="row sticky-bottom">
                    <button type="submit" class="btn btn-danger">點我送出訂單</button>
                </div>
            </form>
        </template>
        <template v-else>
            <h3 class="text-center">請先在購物車頁面選擇您要下單的商品</h3>
        </template>
    </LoginCheck>
</template>