<template>
  <input
    type="text"
    @input="$emit('update:value', $event.target.value)"
    :value="value"
    :placeholder="placeholder"
    class="px-3 py-1 bg-primary-light border-2 border-primary-dark rounded-full focus:outline-none text-white placeholder-primary-ligter"
  />
</template>

<script setup>
  defineProps(['value', 'placeholder']);
  defineEmits(['update:value']);
</script>
