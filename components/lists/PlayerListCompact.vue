<template>
  <div class="p-4">
    <div v-if="players.length === 0" class="text-gray-600">No players to display.</div>
    <div v-else class="overflow-y-auto overflow-x-hidden max-h-60 scrollbar">
      <PlayerCard
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        class="cursor-pointer hover:bg-gray-100"
      />
    </div>
  </div>
</template>

<style scoped>
  .scrollbar::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #ea970a; /* Set the color of the scrollbar thumb */
    border-radius: 5px; /* Set the border radius of the scrollbar thumb */
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: #e5e7eb; /* Set the color of the scrollbar track */
    border-radius: 5px; /* Set the border radius of the scrollbar track */
  }
</style>

<script setup>
  const props = defineProps({
    players: {
      type: Array,
      required: true,
    },
  });
</script>
