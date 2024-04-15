<template>
  <Head>
    <Title>WealthWars - Lobby</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <Notification ref="notification"/>
  <main class="w-full h-screen flex">
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

  const players = ref([
    { name: '', email: store.user.email, picture: store.user.picture },
  ]);

  if (store.connectedPlayers) {
    players.value = store.connectedPlayers.map(player => {
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
    players.value = playerList.map(player => {
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
  })

  function leaveLobby() {
    socket.emit('leaveRoom');
    store.setRoom(null);
    navigateTo('/dashboard');
  }

  // Chat
  const message = ref('');

  const me = 3;
  const messages = ref([
    {
      player: 2,
      text: 'Ahora te la voy a quitar yo :)',
    },
    {
      player: 1,
      text: 'Por fin Huesca es mía jeje',
    },
    {
      player: 0,
      text: 'Ayudaaa!! Me atacaaa!',
    },
    {
      player: 1,
      text: 'Os voy a conquistar!',
    },
  ]);

  function sendMessage() {
    // Check message value is not empty
    if (message.value != '') {
      messages.value.unshift({
        player: me,
        text: message.value,
      });
      // Clean message value
      message.value = '';
    }
  }

  // Copy to Clipboard

  let showIconCheck = ref(false);

  const copyToClipboard = async () => {
    const clipboard = roomCode;
    try {
      await navigator.clipboard.writeText(clipboard);
      showIconCheck.value = true;
      setTimeout(() => {
        showIconCheck.value = false;
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  /*const players = ref([
  {
        name: 'Jaime',
        email: 'jaime@gmail.com', // Puede ser otro identificador (necesario para solicitudes de amistad)
        picture: 'sdffd', // La que devuelva google al iniciar sesión
        coins: 10,
      },
      {
        name: 'Javier',
        email: 'javier@gmail.com',
        picture: 'sfsff',
        coins: 20,
      },
      {
        name: 'Jorge',
        email: 'jorge@gmail.com',
        picture: 'sfdsfd',
        coins: 30,
      },
      {
        name: 'Job',
        email: 'job@gmail.com',
        picture: 'sfddsff',
        coins: 40,
      }
  ]);*/
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
