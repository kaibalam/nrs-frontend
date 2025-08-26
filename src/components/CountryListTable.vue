<template>
    <div class="mt-4">
        <h3 class="mb-2">States of {{ country.countryName }}</h3>

        <DataTable :value="rows" :loading="loading" dataKey="id" class="w-full" responsiveLayout="scroll">
            <Column field="stateName" header="Nombre" sortable />
            <Column field="population" header="Código" />
            <Row />
        </DataTable>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import axios from 'axios';

const props = defineProps({
    country: {
        type: Object,
        required: true
    }
});

const rows = ref([]);
const loading = ref(false);

console.log(country);



async function loadData() {
    loading.value = true;
    try {

        const resp = await axios.get(`http://localhost:8080/api/states/list/${props.country.countryName}/population`);
        rows.value = resp.data
        console.log(resp);
    } catch (err) {
        console.log("Error cargando counties", err);
        rows.value = []
    } finally {
        loading.value = false;
    }
}

onMounted(loadData);

// recargar cuando cambie el país
watch(
    () => props.country,
    () => loadData(),
    { deep: true, immediate: true }
);


</script>
