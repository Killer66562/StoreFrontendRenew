import { defineStore } from "pinia";
import { useUserDataStore } from "./userDataStore";
import { useUserStoreStore } from "./userStoreStore";
import { useAsyncState } from "@vueuse/core";
import { useTokenStore } from "./tokenStore";
import { useCitiesStore } from "./citiesStore";
import { useDistrictsStore } from "./districtsStore";
import { useItemsStore } from "./itemsStore";

export const useRootStore = defineStore("rootStore", () => {
    const tokenStore = useTokenStore();
    const userDataStore = useUserDataStore();
    const userStoreStore = useUserStoreStore();
    const citiesStore = useCitiesStore();
    const districtsStore = useDistrictsStore();
    const itemsStore = useItemsStore();

    const init = async () => {
        try {
            await userDataStore.fetchUserData();
        }
        catch (err) {
            tokenStore.logout();
        }
        try {
            await Promise.all([
                citiesStore.fetchData(),
                districtsStore.fetchData(),
                itemsStore.fetchHotItems(),
                itemsStore.fetchBestItems(),
                itemsStore.fetchItemsData()
            ]);
        }
        catch (err) { throw err; }
        try {
            await userStoreStore.fetchData();
        }
        catch (err) {}
    }

    const initState = useAsyncState(() => init(), undefined, { immediate: false });
    const { isLoading, isReady, error } = initState;
    return { init, initState, isLoading, isReady, error }
});