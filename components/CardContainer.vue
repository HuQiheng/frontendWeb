<template>
  <div class="card-container overflow-x-auto flex flex-row justify-center py-4">
    <Card v-for="(card, index) in cards" :key="index" :image="card.image" class="h-72 w-72 mr-8 ml-8 mb-8" />
  </div>
</template>

<script setup>
  const cards = [{ image: '/gallery1.jpeg' }, { image: '/gallery2.jpeg' }, { image: '/gallery3.jpeg' }];
</script>

<style scoped>
  .card-container::-webkit-scrollbar {
    display: none;
  }
</style>
