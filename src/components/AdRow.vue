<script setup lang="ts">
import { ref } from 'vue';
import { ApiInstance } from '../api/apiInstance';
import { AdSchema } from '../models';
import { getStaticFile } from '../funcs';

const counter = ref<number>(0);
const ads = ref<AdSchema[]>([]);

const fetchAds = async () => {
    const apiInstance = new ApiInstance();
    try {
        ads.value = await apiInstance.get("/general/ads");
    }
    catch (err) {
        counter.value++;
        if (counter.value < 5)
            await fetchAds();
    }
}

fetchAds();
</script>

<template>
    <div class="row flex-nowrap overflow-auto " style="height: 8vh;">
        <div class="col-3 col-md-2 col-lg-1" v-for="ad in ads" :key="ad.id">
            <a :href="ad.url">
                <img class="img-fluid h-100" :src="getStaticFile(ad.icon)" v-if="ad.icon">
            </a>
        </div>
    </div>
</template>