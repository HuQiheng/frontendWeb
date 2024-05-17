<template>
  <div
    class="bg-primary-light flex flex-grow shadow-md border border-primary rounded-lg p-4 m-4 break-all cursor-pointer hover:bg-primary-dark"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0 mr-3">
        <img :src="player.picture" :alt="player.name" referrerPolicy="no-referrer" class="h-12 w-12 rounded-full" />
      </div>
      <div>
        <div class="font-bold text-xl text-white">{{ player.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    player: {
      type: Object,
      required: true,
    },
  });
</script>
