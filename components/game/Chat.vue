<template>
  <div class="message-container scrollbar" id="scrollable">
    <div v-for="message in messages" class="message scrollbar">
      <div :class="'player' + message.player" class="player">
        <span v-if="message.player != me">{{ players[message.player].name }}</span>
        <span v-else>Yo</span>
      </div>
      <div>
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .message-container {
    @apply h-full max-h-[calc(100vh-73px)] px-4 pb-4 overflow-x-hidden overflow-y-scroll flex flex-col-reverse;
  }

  .message-container .message {
    @apply px-4 py-2 flex flex-col bg-gray-100 mt-4 rounded-3xl;
  }

  .message-container .message .player span {
    @apply text-sm;
  }

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
  const props = defineProps({
    messages: {
      required: true,
    },
    players: {
      required: true,
    },
    me: {
      type: Number,
      required: true,
    },
  });

  // Function to always scroll to the bottom of the container
  /*function scrollToBottom() {
  var container = document.getElementById('scrollable');
  console.log(container.scrollHeight);
  container.scrollTop = container.scrollHeight - 500; 
}

watch(props.messages, () => {
  console.log('scrolling down');
  scrollToBottom();
})

onMounted(() => {
  scrollToBottom();
});*/
</script>
