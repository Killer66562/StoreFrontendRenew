import { defineStore } from "pinia";
import { ref } from 'vue'
import { UserSchema } from "../models";
import { ApiInstance, baseConfig } from "../api";

export const useUserDataStore = defineStore("userDataStore", () => {
    const userData = ref<UserSchema>();
    const fetchUserData = async () => {
        const apiInstance = new ApiInstance(baseConfig);
        userData.value = await apiInstance.get("/user");
    }
    const resetUserData = () => {
        userData.value = undefined;
    }
    return { userData, fetchUserData, resetUserData }
});