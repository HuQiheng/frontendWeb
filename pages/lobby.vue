<template>
  <Head>
    <Title>WealthWars - Lobby</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <main class="w-full h-screen flex flex-row overflow-hidden">
    <section class="grow flex flex-col">
      <div class="flex mt-6 mr-6 ml-6 justify-start">
        <ButtonRed @click="leaveLobby">Abandonar Sala</ButtonRed>
      </div>
      <div class="flex mb-6 mr-6 ml-6 justify-center">
        <h1 class="text-4xl font-bold m-4">Sala de Espera</h1>
      </div>

      <div class="flex m-6 justify-center items-center">
        <p>Código: {{ roomCode }}</p>
      </div>
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
    <section class="w-96 shadow-md border border-gray-200 flex flex-col">
      <Chat :messages="messages" :players="players" :me="me"></Chat>
      <div class="p-4 w-full flex flex-row border-t border-gray-200">
        <InputText class="w-full" @keydown.enter="sendMessage" placeholder="Escribe aquí" v-model:value="message" />
        <ButtonDark class="ml-4" @click="sendMessage"><IconSend /></ButtonDark>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { IconSend, IconArrowBarToRight } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  const roomCode = store.user.room;

  const players = ref([
    { name: 'Eindres', email: '', avatar: '/profile.svg' },
    { name: 'DiChorg', email: '', avatar: '/profile.svg' },
    { name: 'Eindres Senior', email: '', avatar: '/profile.svg' },
    { name: 'Mini-Chorg', email: '', avatar: '/profile.svg' },
  ]);

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  socket.on('playerJoined', () => {
    alert('Se unió un jugador');
  });

  socket.on('connectedPlayers', (playerList) => {
    alert('Jugadores conectados');
    console.log(playerList);
  });

  function startGame() {
    socket.emit('startGame', roomCode);
  }

  socket.on('gameStarting', (code) => {
    navigateTo('/play');
  });

  function leaveLobby() {
    socket.emit('leaveRoom');
    store.setRoom = null;
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
