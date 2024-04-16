<template>
  <input
    type="number"
    @input="$emit('update:value', $event.target.value)"
    :value="value"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    class="px-3 py-1 border-2 border-gray-600 rounded-full focus:outline-none"
  />
</template>

<script setup>
  defineProps(['value', 'placeholder', 'min', 'max']);
  defineEmits(['update:value']);
</script>
