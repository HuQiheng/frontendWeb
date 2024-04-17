<template>
    <Transition name="slide-in-out">
      <div v-if="isShown" class="absolute left-1/2 transform -translate-x-1/2  p-8 z-20">
        <div class="flex flex-grow bg-white shadow-md border rounded-lg p-4 m-4 break-all">
          <div class="flex flex-row items-center">
            <div>
              <div class="font-bold text-xl"> Te ha invitado {{ player }}</div>
            </div>
            <Button class ="ml-4 mr-2" @click="accept"><IconCheck/></Button>
            <ButtonRed class="mr-2" @click="reject"><IconX/></ButtonRed>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <style scoped>
.slide-in-out-enter-active, .slide-in-out-leave-active {
  transition: transform 0.5s ease;
}

.slide-in-out-enter, .slide-in-out-leave-to {
  transform: translate(-50%, -100%);
}
</style>
  
  <script setup>
  import { IconCheck, IconX } from '@tabler/icons-vue';
  
  const player = ref('');
  const isShown = ref(false);
  const sound = '/notification.mp3';
  const answer = ref(false);
  
  function notificate(p) {
    player.value = p;
    isShown.value = true;
    const audio = new Audio(sound);
    audio.loop = false;
    audio.play();
    setTimeout(() => {
      isShown.value = false;
    }, 10000);
    return 0;
  }

  function accept() {
    answer.value = true;
    isShown.value = false;
  }

  function reject() {
    answer.value = false;
    isShown.value = false;
  }
  
  defineExpose({
    notificate,
  });
  </script>
  