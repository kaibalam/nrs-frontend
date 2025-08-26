<template>
  <div class="card flex flex-col gap-2 p-4">
    <div class="row">
        <label for="country">Countries</label>
    </div>
    <div>

        <AutoComplete
          id="country"
          v-model="value"
          :suggestions="items"
          @complete="search"
          optionLabel="countryName"     
          forceSelection
          dropdown
          placeholder="Selecciona un país"
          class="w-80"
        />
    </div>
  </div>
  <div class="card">
    <CountryListTable v-if="value" :country="value"/>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AutoComplete from "primevue/autocomplete"
import axios from "axios"

import CountryListTable from './components/CountryListTable.vue';

const value = ref(null)   // aquí se guarda el país seleccionado (objeto completo)
const items = ref([])     // aquí se guardan las sugerencias

// Función de búsqueda llamada cada vez que el usuario escribe
const search = async (event) => {
  try {
    const resp = await axios.get("http://localhost:8080/api/nrs/countries/all", {
      params: { filter: event.query }   // lo que el usuario escribió
    })
    // el backend debe devolver [{ countryName, population }]
    items.value = resp.data
  } catch (err) {
    console.error("Error cargando países:", err)
    items.value = [] // en caso de error, limpiar
  }
}
</script>
