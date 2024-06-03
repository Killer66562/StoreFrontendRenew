import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FullOrderSchema, PageSchema } from "../models";
import { ApiInstance } from "../api";
import { RefSymbol } from "@vue/reactivity";

export const useStoreOrdersStore = defineStore("storeOrdersStore", () => {
    const data = ref<FullOrderSchema[]>([]);
    const pages = ref<number>(Infinity);
    const upperBound = ref<number>(1);
    const lowerBound = ref<number>(1);
    const reset = () => {
        data.value = [];
    }
    const pageSwitch = () => {
        reset();
        if (lowerBound.value == 1)
            upperBound.value = 1;
        else
            upperBound.value = lowerBound.value - 1;
    }
    const canLoadUpper = computed<boolean>(() => upperBound.value >= 1 && upperBound.value < lowerBound.value);
    const canLoadLower = computed<boolean>(() => lowerBound.value >= 1 && lowerBound.value <= pages.value);
    const loadUpper = async () => {
        if (canLoadUpper.value === true) {
            const apiInstance = new ApiInstance();
            try {
                const paginatedData: PageSchema<FullOrderSchema> = await apiInstance.get("/user/store/orders", { page: upperBound.value, size: 20 });
                data.value.unshift(...paginatedData.items);
                pages.value = paginatedData.pages;
                upperBound.value--;
            }
            catch (err) {
                throw err;
            }
        }
    }
    const loadLower = async () => {
        if (canLoadLower.value === true) {
            const apiInstance = new ApiInstance();
            try {
                const paginatedData: PageSchema<FullOrderSchema> = await apiInstance.get("/user/store/orders", { page: lowerBound.value, size: 20 });
                data.value.push(...paginatedData.items);
                pages.value = paginatedData.pages;
                lowerBound.value++;
            }
            catch (err) {
                throw err;
            }
        }
    }
    return { data, pages, upperBound, lowerBound, canLoadUpper, canLoadLower, loadUpper, loadLower, reset, pageSwitch };
})