<template>
  <div class="p-5 bg-white rounded-full border border-gray-200 shadow-sm">
    <div
      v-for="(player, index) in players"
      :key="player.email"
      class="py-2 flex flex-col items-center"
      :class="{ 'opacity-50': turn != index }"
    >
      <img
        class="w-20 h-20 rounded-full border-8"
        :class="'border-player' + index"
        :src="player.picture"
        referrerPolicy="no-referrer"
        :alt="player.name"
      />
      <!--<p class="text-xs py-1">{{ player.name }}</p>-->
    </div>
  </div>
</template>

<script setup>
  defineProps(['players', 'turn']);
</script>
