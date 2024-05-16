import { defineStore } from "pinia";
import { ApiInstance } from "../api";
import { ref } from "vue";
import { CitySchema } from "../models";

export const useCitiesStore = defineStore("citiesStore", () => {
    const citiesData = ref<CitySchema[]>([]);
    const fetchData = async () => {
        const apiInstance = new ApiInstance();
        citiesData.value = await apiInstance.get("/general/cities");
    }
    const resetData = () => {
        citiesData.value = [];
    }
    return { citiesData, fetchData, resetData };
});