<template>
  <div
    v-show="showPopup"
    class="fixed w-full h-screen z-30 flex flex-col justify-center items-center"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <ConfettiExplosion
      v-if="visible"
      force="1"
      particleCount="700"
      duration="15000"
      stageHeight="1300"
      stageWidth="2100"
      :colors="['#3b82f6', '#f43f5e', '#f59e0b', '#22c55e']"
    />
    <div class="flex flex-col items-center text-white">
      <h2 class="text-5xl">{{ message }}</h2>
      <p class="text-xl pt-4" v-id="subMessage">{{ subMessage }}</p>
      <Button class="mt-4" @click="quit">Volver a la pantalla principal</Button>
    </div>
  </div>
</template>

<script setup>
  import ConfettiExplosion from 'vue-confetti-explosion';
  import { useUserStore } from '~/stores';

  const store = useUserStore();

  const showPopup = ref(false);
  const message = ref('Hello');
  const subMessage = ref(null);
  const visible = ref(false);

  const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
  };

  function showMessage(msg) {
    message.value = msg;
  }

  function showVictory(username) {
    message.value = '¡Enhorabuena ' + username + '!';
    subMessage.value = 'Has ganado la partida';
    showPopup.value = true;
    const victoryAudio = new Audio('/trumpet_victory.mp3');
    victoryAudio.loop = false;
    victoryAudio.volume = 0.2;
    victoryAudio.play();
    explode();
  }

  function quit() {
    store.setRoom(null);
    navigateTo('/dashboard');
  }

  defineExpose({
    showMessage,
    showVictory,
  });
</script>
