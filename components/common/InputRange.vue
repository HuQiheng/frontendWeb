<template>
  <input 
    type="range" 
    @input="$emit('update:value', $event.target.value)"
    :value="value"
    :min="min"
    :max="max"
    class="w-full h-2 bg-gray-950 rounded-lg appearance-none cursor-pointer focus:outline-none">
</template>

<script setup>
  defineProps(['value', 'placeholder', 'min', 'max']);
  defineEmits(['update:value']);
</script>