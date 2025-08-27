<template>
    <Dropdown 
    v-model="selected" 
    :options="countries" 
    @update:modelValue="handleCountrySelected"/>
</template>

<script setup>
// sin lógica, solo dropdown estático
import { onMounted, ref } from 'vue';
import Dropdown from './ui/Dropdown.vue';
import { fetchCountries } from '../services/catalogServices';

const selected = ref('');
const countries = ref([]);
const emit = defineEmits(['selected']);

function handleCountrySelected(country){
    emit('selected', country);
};

onMounted(async() => {
    try {
        const response = await fetchCountries();
        countries.value = response;
    } catch (error) {
        console.log(`Error loading countries: [ ${error}]`);
    }
})

</script>