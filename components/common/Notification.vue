<template>
  <Transition name="fade" mode="out-in">
    <div class="fixed top-0 right-0 p-8 z-20" v-show="isShown">
      <div class="px-4 py-2 bg-white border border-gray-200 shadow-md text-md rounded-full">
        {{ text }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<script setup>
  const text = ref('');
  const isShown = ref(false);
  const sound = '/notification.mp3';

  // Shows notification with text given by t
  function show(t) {
    text.value = t;
    isShown.value = true;
    const audio = new Audio(sound);
    audio.loop = false;
    audio.play();
    setTimeout(() => {
      isShown.value = false;
    }, 2000);
  }

  defineExpose({
    show,
  });
</script>
