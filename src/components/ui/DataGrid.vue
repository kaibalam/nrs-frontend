<template>
  <ul class="list-none">
    <li v-for="item in items" :key="item.name" :class="[
      'p-0 rounded-lg mb-0 shadow-sm',
      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    ]">
      <p class="font-bold text-gray-800">{{ item.name }}</p>
      <p class="text-sm text-gray-600">{{ item.population.toLocaleString() }}</p>
    </li>
  </ul>

  <p v-if="loading" class="text-gray-500 mt-2">Cargando...</p>
</template>
<script setup>
defineProps({
  items: { type: Array, required: true },
  title: { type: String, default: "Lista de estados" },
  loading: { type: Boolean, default: false }
});
</script>
