<template>
  <div>
    <div v-if="friends.length === 0" class="text-gray-600">No friends to display.</div>
    <div v-else>
      <FriendCard v-for="(friend, index) in friends" :key="index" :friend="friend" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    friends: {
      type: Array,
      required: true,
    },
  });
</script>
