<template>
    <div class="card" style="width: 50%; position:inherit;" >
        <h2 class="text-xl font-semibold mb-0">States of {{ country }}</h2>
        <DataGrid :items="states" :loading="loading" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DataGrid from './ui/DataGrid.vue';
import { fetchStatesPopulation } from "../services/catalogServices";

const props = defineProps({
    country: {
        type: [String, Number, null],
        default: ''
    }
})

const states = ref([]);
const loading = ref(false);

watch(() => props.country,
    async (newCountry) => {
        if (!newCountry) return;
        loading.value = true;
        try {
            console.log(newCountry);
            const response = await fetchStatesPopulation(newCountry);
            console.log(response);
            states.value = response;
        } catch (error) {
            console.log(`Error getting states populations [ ${error}]`);
        } finally {
            loading.value = false;
        }
    },
    { immediate: true }
);


</script>
