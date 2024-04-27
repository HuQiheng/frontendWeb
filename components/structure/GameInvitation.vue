<template>
  <Transition name="slide-in-out">
    <div v-if="isShown" class="absolute left-1/2 transform -translate-x-1/2 p-8 z-20">
      <div class="flex flex-grow bg-white shadow-md border rounded-lg p-4 m-4">
        <div class="flex flex-row items-center">
          <div class="flex-shrink-0 mr-3">
            <img :src="player.picture" :alt="player.name" class="h-12 w-12 rounded-full" />
          </div>
          <div>
            <div class="font-bold text-xl">{{ player.name }} te ha invitado a jugar</div>
          </div>
          <Button class="ml-4 mr-2" @click="acceptEvent"><IconCheck /></Button>
          <ButtonRed class="mr-2" @click="rejectEvent"><IconX /></ButtonRed>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import { IconCheck, IconX } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';

  const store = useUserStore();

  const player = ref({ name: 'Eindres', email: '', picture: '/profile.svg' });
  const isShown = ref(false);
  const roomCode = ref('');
  const sound = '/notification.mp3';

  const emit = defineEmits(['accept']);

  function notificate(p, rmCode) {
    player.value = p;
    roomCode.value = rmCode;
    isShown.value = true;
    const audio = new Audio(sound);
    audio.loop = false;
    audio.play();
    setTimeout(() => {
      isShown.value = false;
    }, 10000);
  }

  function acceptEvent() {
    store.setRoom(roomCode.value);
    isShown.value = false;
    // Emit the 'accept' event
    emit('accept');
  }

  function rejectEvent() {
    isShown.value = false;
  }

  defineExpose({
    notificate,
  });
</script>
