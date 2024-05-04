<template>
  <div class="p-4">
    <div v-if="players.length === 0" class="text-gray-600 text-center text-xl">No hay jugadores que mostrar.</div>
    <div v-else>
      <PlayerInfo v-for="(player, index) in players" :key="index" :player="player" />
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
