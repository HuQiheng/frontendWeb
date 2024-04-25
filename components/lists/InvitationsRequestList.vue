<template>
  <div class="p-4">
    <div v-if="friends.length === 0" class="text-gray-600 text-center text-xl">No players to display.</div>
    <div v-else class="overflow-y-auto overflow-x-hidden max-h-96 scrollbar">
      <div v-for="(player, index) in friends" :key="index" class="flex flex-grow m-1">
        <div class="flex flex-grow bg-white shadow-md border rounded-lg p-4 m-1">
          <div class="flex items-center flex-grow">
            <div class="flex-shrink-0 mr-3">
              <img :src="player.picture" :alt="player.name" class="h-12 w-12 rounded-full" />
            </div>
            <div class="flex flex-grow">
              <!-- Changed to flex-col -->
              <div class="font-bold text-xl">{{ player.name }}</div>
            </div>
            <div class="flex justify-start">
              <!-- Changed to justify-start -->
              <Button class="mr-2" @click="acceptEvent"><IconCheck /></Button>
              <!-- Adjusted margin -->
              <ButtonRed class="mr-2" @click="rejectEvent"><IconX /></ButtonRed>
              <!-- Adjusted margin -->
            </div>
          </div>
        </div>
      </div>
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
  import { IconCheck, IconX } from '@tabler/icons-vue';

  const props = defineProps({
    players: {
      type: Array,
      required: true,
    },
  });

  // This needs to be bd request. Debug version
  const friends = ref([
    { name: 'Eindres', email: '', picture: '/profile.svg' },
    { name: 'DiChorg', email: '', picture: '/profile.svg' },
  ]);

  function acceptEvent(player) {}

  function rejectEvent(player) {}
</script>
