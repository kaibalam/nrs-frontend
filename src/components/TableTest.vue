<template>
    <div class="card">
        <h1>States of {{ country }}</h1>

        <!-- Tabla de Estados -->
        <DataTable v-model:filters="filters" :value="states" selectionMode="single" dataKey="id"
            :metaKeySelection="false" @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" filterDisplay="row"
            tableStyle="min-width: 50rem" :globalFilterFields="['name','population']">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['name'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>

            <Column field="name" sortable header="State" filterField="name" ></Column>
            <Column field="population" sortable header="Population"></Column>
        </DataTable>
    </div>

    <!-- Dialog con Counties -->
    <div class="card flex justify-center">
        <Dialog v-model:visible="visible" maximizable modal :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

            <h2>Counties of {{ selectedState }}</h2>
            <DataTable v-model:filters="filters" :value="counties" selectionMode="single" dataKey="id"
                :metaKeySelection="false" tableStyle="min-width: 50rem">

                <Column field="county" sortable header="County"></Column>
                <Column field="population" sortable header="Population"></Column>
            </DataTable>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from '@primevue/core/api';
import { fetchCountiesByState, fetchStatesPopulation } from '../services/catalogServices';
import { Column, DataTable, Dialog, IconField, InputIcon, InputText, Toast } from 'primevue';

const props = defineProps({
    country: {
        type: [String, Number, null],
        default: ''
    }
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    population: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const visible = ref(false);
const selectedState = ref('');
const counties = ref([]);
const states = ref([]);
const loading = ref(false);

watch(() => props.country,
    async (newCountry) => {
        if (!newCountry) return;
        loading.value = true;
        try {
            const response = await fetchStatesPopulation(newCountry);
            states.value = response;
        } catch (error) {
            console.log(`Error getting states populations [ ${error}]`);
        } finally {
            loading.value = false;
        }
    },
    { immediate: true }
);

const toast = useToast();

const onRowSelect = async (event) => {
    try {
        const state = event.data.name;
        const headerName = `Counties of ${state}`;
        selectedState.value = state;
        visible.value = true;

        const response = await fetchCountiesByState(state);
        counties.value = response;
    } catch (err) {
        console.log(`Error from counties service [ ${err} ]`);
    }
};

const onRowUnselect = (event) => {
    toast.add({
        severity: 'warn',
        summary: 'State Unselected',
        detail: 'Name: ' + event.data.name,
        life: 3000
    });
};
</script>
