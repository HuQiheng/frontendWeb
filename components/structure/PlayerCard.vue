<template>
  <div class="flex flex-grow bg-white shadow-md border rounded-lg p-4 m-4 break-all">
    <div class="flex items-center">
      <div class="flex-shrink-0 mr-3">
        <img :src="player.picture" :alt="player.name" class="h-12 w-12 rounded-full" />
      </div>
      <div>
        <div class="font-bold text-xl">{{ player.name }}</div>
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
