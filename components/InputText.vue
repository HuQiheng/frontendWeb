<template>
  <input 
    type="text" 
    @input="$emit('update:value', $event.target.value)"
    :value="value"
    :placeholder="placeholder"
    class="px-3 border-2 border-primary rounded-full focus:outline-none">
</template>

<script setup>
defineProps(['value', 'placeholder']);
defineEmits(['update:value']);
</script>