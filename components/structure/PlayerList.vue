<template>
  <div>
    <div v-if="players.length === 0" class="text-gray-600">No players to display.</div>
    <div v-else>
      <PlayerCard v-for="(player, index) in players" :key="index" :player="player" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    players: {
      type: Array,
      required: true,
    },
  });
</script>
