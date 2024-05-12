<template>
  <div
    v-show="showPopup"
    class="fixed w-full h-screen z-30 flex flex-col justify-center items-center text-white"
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
    <div v-if="type == 'victory'" class="flex flex-col items-center">
      <h2 class="text-5xl">{{ message }}</h2>
      <p class="text-xl pt-4" v-id="subMessage">{{ subMessage }}</p>
      <ButtonDark class="mt-4" @click="$emit('quit')">Volver a la pantalla principal</ButtonDark>
    </div>
    <div v-if="type == 'message'" class="flex flex-col items-center">
      <h4 class="text-3xl text-center">{{ message }}</h4>
    </div>
    <div v-if="type == 'ranking'" class="flex flex-col items-center">
      <h2 class="text-5xl mb-6">¡Game Over!</h2>
      <p class="text-2xl mb-6">Este ha sido el ranking:</p>
      <div class="flex flex-col">
        <div v-for="(player, index) in ranking" class="p-4 mb-4 flex flex-row items-center rounded-xl bg-primary">
          <div class="relative">
            <img 
              :src="player.picture" 
              referrerPolicy="no-referrer"
              :alt="player.name"
              class="rounded-full h-14 w-14 relative"
            >
            <span v-if="index == 0" class="absolute text-lg -top-4 left-[19px] select-none">👑</span>
          </div>
          <p class="text-xl ml-4">{{ player.name }}</p>
        </div>
      </div>
      <ButtonDark class="mt-4" @click="$emit('quit')">Volver a la pantalla principal</ButtonDark>
    </div>
  </div>
</template>

<script setup>
  import ConfettiExplosion from 'vue-confetti-explosion';
  import { useUserStore } from '~/stores';

  const store = useUserStore();

  const type = ref('');
  const showPopup = ref(false);
  const message = ref('Hello');
  const subMessage = ref(null);
  const visible = ref(false);
  const ranking = ref([]);

  const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
  };

  function showMessage(msg) {
    type.value = 'message';
    message.value = msg;
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
    }, 2500);
  }

  function showGameOver(rank) {
    type.value = 'ranking';
    message.value = '¡Game Over!';
    ranking.value = rank;
    console.log('ranking');
    console.log(ranking.value);
    showPopup.value = true;
  }

  function showVictory(username) {
    type.value = 'victory';
    message.value = '¡Enhorabuena ' + username + '!';
    subMessage.value = 'Has ganado la partida';
    showPopup.value = true;
    const victoryAudio = new Audio('/audio/trumpet_victory.mp3');
    victoryAudio.loop = false;
    victoryAudio.volume = 0.2;
    victoryAudio.play();
    explode();
  }

  /*function quit() {
    store.setRoom(null);
    navigateTo('/dashboard');
  }*/

  defineExpose({
    showMessage,
    showGameOver,
    showVictory,
  });
</script>
