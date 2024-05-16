import { defineStore } from "pinia";
import { ref } from 'vue'
import { LoginSchema, TokenSchema, UserSchema } from "../models";
import { ApiInstance, baseConfig } from "../api";
import { useTokenStore } from "./tokenStore";

export const useUserDataStore = defineStore("userDataStore", () => {
    const tokenStore = useTokenStore();
    const userData = ref<UserSchema>();
    const fetchUserData = async () => {
        const apiInstance = new ApiInstance(baseConfig);
        userData.value = await apiInstance.get("/user");
    }
    const resetUserData = () => {
        userData.value = undefined;
    }
    const login = async (loginData: LoginSchema) => {
        const apiInstance = new ApiInstance();
        try {
            const tokenData: TokenSchema = await apiInstance.post("/login", loginData);
            tokenStore.accessToken = tokenData.access_token;
            tokenStore.refreshToken = tokenData.refresh_token;
            try {
                await fetchUserData();
            }
            catch (err) {}
        }
        catch (err) {
            throw err;
        }
    }
    const logout = () => {
        tokenStore.accessToken = null;
        tokenStore.refreshToken = null;
        userData.value = undefined;
    }
    return { userData, fetchUserData, resetUserData, login, logout }
});