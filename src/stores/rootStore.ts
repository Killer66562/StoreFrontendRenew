import { defineStore } from "pinia";
import { useUserDataStore } from "./userDataStore";
import { useUserStoreStore } from "./userStoreStore";
import { useAsyncState } from "@vueuse/core";
import { useTokenStore } from "./tokenStore";
import { useCitiesStore } from "./citiesStore";
import { useDistrictsStore } from "./districtsStore";
import { useItemsStore } from "./itemsStore";
import { useUserCartItemsStore } from "./userCartItemsStore";
import { useUserLikedItemsStore } from "./userLikedItemsStore";
import { useUserOrdersStore } from "./userOrdersStore";

export const useRootStore = defineStore("rootStore", () => {
    const tokenStore = useTokenStore();
    const userDataStore = useUserDataStore();
    const userStoreStore = useUserStoreStore();
    const citiesStore = useCitiesStore();
    const districtsStore = useDistrictsStore();
    const itemsStore = useItemsStore();
    const userCartItemsStore = useUserCartItemsStore();
    const userLikedItemsStore = useUserLikedItemsStore();
    const userOrdersStore = useUserOrdersStore();

    const init = async () => {
        try {
            await userDataStore.fetchUserData();
        }
        catch (err) {
            tokenStore.logout();
        }
        try {
            await Promise.all([
                itemsStore.fetchHotItems(),
                itemsStore.fetchBestItems(),
                itemsStore.fetchItemsData(),
            ]);
        }
        catch (err) {
            throw err;
        }
        if (userDataStore.userData) {
            try {
                await Promise.all([
                    citiesStore.fetchData(),
                    districtsStore.fetchData(),
                    userCartItemsStore.fetchCartItems(),
                    userLikedItemsStore.fetchLikedItems(),
                    userOrdersStore.fetchOrders()
                ]);
            }
            catch (err) { throw err; }
            try {
                await userStoreStore.fetchData();
            }
            catch (err) {}
        }
    }

    const reset = async () => {
        isLoading.value = true;

        userDataStore.resetUserData();
        tokenStore.logout();
        userStoreStore.resetData();
        citiesStore.resetData();
        districtsStore.resetData();
        itemsStore.resetAll();
        userCartItemsStore.reset();
        userOrdersStore.reset();
        userLikedItemsStore.reset();

        try {
            await Promise.all([
                itemsStore.fetchHotItems(),
                itemsStore.fetchBestItems(),
                itemsStore.fetchItemsData(),
            ]);
        }
        catch (err) {}

        error.value = undefined;
        isReady.value = true;
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }

    const initState = useAsyncState(() => init(), undefined, { immediate: false });
    const { isLoading, isReady, error } = initState;
    return { init, initState, isLoading, isReady, error, reset }
});