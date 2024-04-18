<template>
  <div class="message-container scrollbar" id="scrollable">
    <div v-for="message in messages" class="message scrollbar">
      <div :class="'player' + message.player" class="player">
        <span v-if="message.player != me">{{ players[message.player].name }}</span>
        <span v-else>Yo</span>
      </div>
      <div class="message-text">
        {{ message.text }}
      </div>
    </div>
    <slot></slot>
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

  .message-container .message .message-text {
    @apply break-all;
  }

  .scrollbar::-webkit-scrollbar {
    width: 10px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #083344;
    border-radius: 5px;
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: #e5e7eb;
    border-radius: 5px;
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
