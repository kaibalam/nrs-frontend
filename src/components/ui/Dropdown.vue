<template>
    <div class="w-full p-4 bg-blue-900">
        <!-- Dropdown alineado a la izquierda -->
        <select v-model="selectedValue"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a country</option>
            <option 
            v-for="item in options"
            :key="item.country_name"
            :value="item.country_name">
            {{ item.country_name }}
            </option>

        </select>

    </div>
</template>

<script setup>
// sin lógica, solo dropdown estático
import {ref, watch} from 'vue';

const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: [String, Number, null],
        default: ''
    }
});


const emit = defineEmits(['update:modelValue']);
const selectedValue = ref(props.modelValue);

watch(selectedValue, (newVal) => {
    emit('update:modelValue', newVal);
});

watch(() => props.modelValue, (newVal) => {
    selectedValue.value = newVal;
});
</script>