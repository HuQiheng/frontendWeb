<template>
  <div class="bg-white shadow-md rounded-lg p-4 m-4">
    <div class="flex items-center">
      <div class="flex-shrink-0 mr-3">
        <!-- <img :src="friend.avatar" :alt="friend.name" class="h-12 w-12 rounded-full"> -->
      </div>
      <div>
        <div class="font-bold text-xl">{{ friend.name }}</div>
        <div class="text-gray-600">{{ friend.email }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    friend: {
      type: Object,
      required: true,
    },
  });
</script>
