<template>

  <HeaderPage @selected="handleCountrySelected" />
    <CountryListTable v-if="selectedCountry" :country="selectedCountry" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import HeaderPage from './components/HeaderPage.vue';
import CountryListTable from './components/CountryListTable.vue';
import { fetchStatesPopulation } from "./services/catalogServices";


const selectedCountry = ref(null);
const states = ref([]);

function handleCountrySelected(country) {
  console.log('selected country ', country)
  selectedCountry.value = country;
};

onMounted(async() => {
   try {
            console.log('pais seleccionado desde app ' ,selectedCountry);
            const response = await fetchStatesPopulation(selectedCountry);
            console.log(response);
            states.value = response;
        } catch (error) {
            console.log(`Error getting states populations [ ${error}]`);
        } 
})



</script>
