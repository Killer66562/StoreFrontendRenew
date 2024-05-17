import { defineStore } from "pinia";
import { ApiInstance } from "../api";
import { ref } from "vue";
import { FullDistrictSchema } from "../models";

export const useDistrictsStore = defineStore("districtsStore", () => {
    const districtsData = ref<FullDistrictSchema[]>([]);
    const fetchData = async () => {
        const apiInstance = new ApiInstance();
        districtsData.value = await apiInstance.get("/general/districts");
    }
    const resetData = () => {
        districtsData.value = [];
    }
    return { districtsData, fetchData, resetData };
});