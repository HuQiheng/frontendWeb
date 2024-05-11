<template>
  <Notification ref="notification" />
  <div class="p-4">
    <div v-if="players.length === 0" class="text-white text-center text-xl">No hay amigos para mostrar.</div>
    <div v-else>
      <PlayerCard
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        class="hover:bg-primary"
        @click="inviteFriend(player)"
      />
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['sendInvitation']);

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
    notification.value.show(`${player.name} ha sido invitado`);
    emit('sendInvitation', player);
  }
</script>
