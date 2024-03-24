<template>
  <div class="card bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="image" alt="Card Image" class="object-cover object-center" />
  </div>
</template>

<script setup>
  defineProps({
    image: String,
  });
</script>
