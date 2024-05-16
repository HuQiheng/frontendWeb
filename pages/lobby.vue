<template>
  <Head>
    <Title>WealthWars - Lobby</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <SmallScreen />
  <Notification ref="notification" />
  <AchievementNotification ref="achievementNotification" />
  <main class="w-full h-screen flex flex-row">
    <section class="grow flex flex-col">
      <div class="flex mt-6 mr-6 ml-6 justify-between">
        <ButtonRed @click="leaveLobby">Abandonar Sala</ButtonRed>
        <Audio audio="/audio/elevator_music.mp3"></Audio>
      </div>
      <div class="flex mb-6 mr-6 ml-6 justify-center">
        <h1 class="text-4xl font-bold m-4">Sala de Espera</h1>
      </div>

      <div class="flex flex-row m-6 justify-center items-center relative">
        <div
          class="bg-primary-light flex flex-row items-center p-2 rounded-xl shadow-md border border-primary-dark cursor-pointer hover:bg-primary"
          @click="copyToClipboard"
        >
          <IconClipboard class="mr-2 text-white" />
          <p class="text-xl">{{ roomCode }}</p>
        </div>
        <transition name="fade">
          <div v-if="showIconCheck" class="flex items-center ml-2">
            <IconCheck class="text-white" />
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
        <Button 
          v-show="canStartGame" 
          class="w-full m-10 flex flex-row justify-center text-lg" @click="startGame"
        >
          <span v-if="!isLoading">Empezar partida</span>
          <IconRotateClockwise v-else class="animate-spin" />
        </Button
        >
        <p v-show="!canStartGame" class="m-10">Tienes que esperar a que el que creó la sala inicie la partida.</p>
      </div>
    </section>
    <!-- Chat -->
    <section class="w-96 shadow-md border border-primary-dark flex flex-col p-4">
      <h2 class="font-bold m-4 text-center">Invita a tus amigos</h2>
      <hr />
      <InviteFriendsList :players="friends" @sendInvitation="sendInvitation" />
    </section>
  </main>
</template>

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

<script setup>
  import { IconClipboard, IconCheck, IconRotateClockwise } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  const isLoading = ref(false);

  // Notifications
  const notification = ref(null);

  const roomCode = store.user.room;

  const players = ref([{ name: store.user.name, email: store.user.email, picture: store.user.picture }]);

  const canStartGame = computed(() => {
    if (players.value[0].email.trim() == store.user.email.trim()) {
      return true;
    } else {
      return false;
    }
  });

  if (store.connectedPlayers) {
    players.value = store.connectedPlayers;
  }

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  // Achievement
  let waitAchievement = false; // Indicates no to go to other page, and wait the user to see the achievement dialog
  const achievementNotification = ref(null);
  socket.on('achievementUnlocked', (achievement) => {
    waitAchievement = true;
    achievementNotification.value.show(achievement.title, achievement.description, achievement.image_url);
  });

  socket.on('playerJoined', (name) => {
    notification.value.show('Se unió ' + name);
  });

  socket.on('connectedPlayers', (playerList) => {
    console.log(playerList);
    players.value = playerList.map((player) => {
      return { name: player.username.trim(), email: player.email.trim(), picture: player.picture };
    });
  });

  function startGame() {
    socket.emit('startGame', roomCode);
  }

  // Game is starting
  socket.on('gameStarting', (code) => {
    notification.value.show('El juego va a empezar');
    //navigateTo('/play');
  });

  socket.on('mapSent', (map) => {
    store.gameState = map;
    isLoading.value = true;
    setTimeout(() => {
      navigateTo('/play');
    }, 3000);
  });

  // Leaving the room
  function leaveLobby() {
    socket.emit('leaveRoom');
    store.setRoom(null);
    store.connectedPlayers = null;
    navigateTo('/dashboard');
  }

  // Friends list

  const friends = ref([]);

  useFetch(async () => {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friends', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }
      friends.value = await response.json();
      console.log('Fetched friends:', friends.value);
    } catch (error) {
      console.error('Error fetching friends:', error);
      friends.value = [];
    }
  });

  function sendInvitation(player) {
    console.log(player);
    // Debug version
    // const email = '839756@unizar.es';
    socket.emit('invite', player.email);
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
      console.error('Error al copiar: ', err);
    }
  };
</script>
