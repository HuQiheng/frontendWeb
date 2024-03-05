<template>
  <div class="card-container overflow-x-auto flex flex-row justify-center py-4">
    <Card v-for="(card, index) in cards" :key="index" :image="card.image" class="mr-8 ml-8 mb-8" />
  </div>
</template>

<script setup>
  const cards = [{ image: '/300x300.gif' }, { image: '/300x300.gif' }, { image: '/300x300.gif' }];
</script>

<style scoped>
  .card-container::-webkit-scrollbar {
    display: none;
  }
</style>
