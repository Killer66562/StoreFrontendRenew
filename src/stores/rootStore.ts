import { defineStore } from "pinia";
import { useUserDataStore } from "./userDataStore";
import { useUserStoreStore } from "./userStoreStore";
import { useAsyncState } from "@vueuse/core";
import { useTokenStore } from "./tokenStore";
import { useCitiesStore } from "./citiesStore";

export const useRootStore = defineStore("rootStore", () => {
    const tokenStore = useTokenStore();
    const userDataStore = useUserDataStore();
    const userStoreStore = useUserStoreStore();
    const citiesStore = useCitiesStore();

    const init = async () => {
        try {
            await userDataStore.fetchUserData();
        }
        catch (err) {
            tokenStore.logout();
        }
        try {
            await Promise.all([
                userStoreStore.fetchData(),
                citiesStore.fetchData()
            ]);
        }
        catch (err) { throw err; }
    }

    const initState = useAsyncState(() => init(), undefined, { immediate: false });
    const { isLoading, isReady, error } = initState;
    return { init, initState, isLoading, isReady, error }
});