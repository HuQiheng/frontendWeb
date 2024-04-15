<template>
  <Notification ref="notification" />
  <div class="p-4">
    <div v-if="players.length === 0" class="text-gray-600">No players to display.</div>
    <div v-else>
      <PlayerCard
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        class="hover:bg-gray-100"
        @click="inviteFriend(player)"
      />
    </div>
  </div>
</template>

<script setup>
  // Prop defined
  const props = defineProps({
    players: {
      type: Array,
      required: true,
    },
  });

  // Notification
  const notification = ref(null);

  function inviteFriend(player) {
    notification.value.show(`${player.name} invitado`);
  }
</script>
