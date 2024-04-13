<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <!-- Top section -->
  <section class="m-6 justify-center items-center">
    <!-- section class="flex flex-col justify-center items-center" last -->
    <div class="rounded-xl border shadow-md p-6">
      <!-- User's profile settings -->
      <div class="top-14 m-6 flex flex-col justify-center items-center">
        <img src="/profile.svg" alt="User Picture" style="width: 200px; height: 200px" />
        <p class="m-6 text-xl text-g-800">{{ store.user.name }}</p>
      </div>
      <hr />
      <!-- Achievements -->
      <div class="m-6"></div>
      <!-- Settings part, non related with the user -->
      <div class="flex flex-row justify-center">
        <Settings />
        <ButtonRed class="m-2" @click="signout">Cerrar Sesión <IconArrowBarToRight class="button-icon" /></ButtonRed>
        <!--<RemoveAccount />-->
      </div>
    </div>
  </section>
  <hr />
  <!-- Bottom section -->
  <section class="flex flex-col m-6 lg:flex-row">
    <!-- Left side, match related-->
    <div class="flex flex-col grow w-full rounded-xl border shadow-md m-2 p-6 lg:mt-0 lg:mb-0 lg:ml-0 lg:mr-4">
      <h2 class="flex text-2xl font-bold m-4 text-center justify-center w-full">Juego</h2>
      <hr />
      <!-- Start new match -->
      <div class="flex flex-grow items-center justify-center w-full">
        <div class="flex justify-center w-full m-6">
          <Button @click="createRoom">CREAR PARTIDA</Button>
        </div>
      </div>

      <hr />

      <!-- Join match -->
      <div class="flex flex-row flex-grow justify-center items-center w-full">
        <div class="flex flex-row flex-grow p-4 m-4">
          <InputText
            class="flex-grow text-center m-4"
            placeholder="Introduce código de invitación"
            v-model:value="joinRoomCode"
          />
          <Button class="m-4" @click="joinRoom">UNIRSE</Button>
        </div>
      </div>
    </div>
    <!-- Right side, friends related-->
    <div class="flex flex-col rounded-xl border shadow-md p-6 w-full m-2 lg:mt-0 lg:mb-0 lg:ml-4 lg:mr-0">
      <!-- Title -->
      <h2 class="text-2xl font-bold m-4 text-center">Lista de amigos</h2>
      <hr />
      <!-- Friend Searcher -->
      <div class="flex flex-row p-4 m-4">
        <img src="/zoom.svg" alt="Search icon" />
        <InputText
          class="flex-grow text-center m-4"
          placeholder="Introduce el correo del amigo"
          v-model:value="addFriendMail"
        />
        <Button class="m-4">UNIRSE</Button>
      </div>
      <hr />
      <!-- Frined List -->
      <PlayerListCompact :players="friends" />
    </div>
  </section>
</template>

<script setup>
  import { IconArrowBarToRight } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  const signout = () => {
    navigateTo('/signout');
  };

  const friends = ref([
    { name: 'Eindres', email: '', avatar: '/profile.svg' },
    { name: 'DiChorg', email: '', avatar: '/profile.svg' },
  ]);

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  // Create room
  const createRoom = () => {
    socket.emit('createRoom');
  };
  socket.on('accessCode', (code) => {
    store.setRoom(code);
    navigateTo('/lobby');
  });

  // Join room
  const joinRoomCode = ref('');
  function joinRoom() {
    socket.emit('joinRoom', joinRoomCode.value);
  }
  socket.on('roomAccess', (code) => {
    store.setRoom(code);
    navigateTo('/lobby');
  });
  socket.on('roomJoinError', () => {
    alert('Error al entrar a la sala');
  });
  socket.on('nonExistingRoom', () => {
    alert('La sala no existe');
  });

  // Add a friend
  const addFriendMail = ref('');
</script>
