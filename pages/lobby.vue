<template>
  <Head>
    <Title>WealthWars - Lobby</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <Notification ref="notification" />
  <main class="w-full h-screen flex flex-row">
    <section class="grow flex flex-col">
      <div class="flex mt-6 mr-6 ml-6 justify-start">
        <ButtonRed @click="leaveLobby">Abandonar Sala</ButtonRed>
      </div>
      <div class="flex mb-6 mr-6 ml-6 justify-center">
        <h1 class="text-4xl font-bold m-4">Sala de Espera</h1>
      </div>

      <div class="flex flex-row m-6 justify-center items-center relative">
        <div
          class="flex flex-row items-center p-2 rounded-xl shadow-md border cursor-pointer hover:bg-gray-100"
          @click="copyToClipboard"
        >
          <IconClipboard class="mr-2" />
          <p class="text-xl">{{ roomCode }}</p>
        </div>
        <transition name="fade">
          <div v-if="showIconCheck" class="flex items-center ml-2">
            <IconCheck />
          </div>
        </transition>
      </div>

      <!-- PlayerList -->
      <div>
        <PlayerList :players="players" />
      </div>
      <div class="flex-grow"></div>
      <!-- Spacer to push the button to the bottom -->
      <div class="relative flex justify-center w-full">
        <Button class="m-10 w-full max-w text-center text-lg" @click="startGame">Empezar partida</Button>
      </div>
    </section>
    <!-- Chat -->
    <section class="w-96 shadow-md border border-gray-200 flex flex-col p-4">
      <h2 class="font-bold m-4 text-center">Invita a tus amigos</h2>
      <hr />
      <!-- It has to be friends, but for debugging purpouse it's players -->
      <InviteFriendsList :players="players" />
    </section>
  </main>
</template>

<script setup>
  import { IconClipboard, IconCheck } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  // Notifications
  const notification = ref(null);

  const roomCode = store.user.room;

  const players = ref([{ name: store.user.name, email: store.user.email, picture: store.user.picture }]);

  if (store.connectedPlayers) {
    players.value = store.connectedPlayers.map((player) => {
      return { name: '', email: player, picture: '/profile.svg' };
    });
  }

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  socket.on('playerJoined', (name) => {
    notification.value.show('Se unió ' + name);
  });

  socket.on('connectedPlayers', (playerList) => {
    players.value = playerList.map((player) => {
      return { name: '', email: player, picture: '/profile.svg' };
    });
  });

  function startGame() {
    socket.emit('startGame', roomCode);
  }

  // Event not used since have to wait for mapSended
  /*socket.on('gameStarting', (code) => {
    //navigateTo('/play');
  });*/

  socket.on('mapSended', (map) => {
    console.log('guardando mapa');
    store.gameState = map;
    navigateTo('/play');
  });

  function leaveLobby() {
    socket.emit('leaveRoom');
    store.setRoom(null);
    navigateTo('/dashboard');
  }

  // Copy to Clipboard

  let showIconCheck = ref(false);

  const copyToClipboard = async () => {
    const clipboard = roomCode;
    try {
      await navigator.clipboard.writeText(clipboard);
      showIconCheck.value = true;
      notification.value.show('Código de sala copiado');
      setTimeout(() => {
        showIconCheck.value = false;
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
