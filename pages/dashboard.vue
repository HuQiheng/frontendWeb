<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <section class="m-6">
    <!-- section class="flex flex-col justify-center items-center" last -->
    <div class="rounded-xl border border-gray-800 p-6">
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
        <ButtonRed class="w-36 m-4" @click="signout">Cerrar Sesión</ButtonRed>
        <RemoveAccount />
      </div>
    </div>
  </section>
  <hr />
  <section class="flex flex-row m-6">
    <!-- Left side, match related-->
    <div class="flex flex-col items-center rounded-xl border border-gray-800 p-6 w-full mr-4">
      <h2 class="text-2xl font-bold m-4">Juego</h2>
      <!-- Start new match -->
      <div class="m-6">
        <Button @click="createRoom">CREAR PARTIDA</Button>
      </div>

      <hr />

      <!-- Join match -->
      <div class="flex flex-row justify-center m-6 w-full max-w-md">
        <div class="flex flex-row w-full max-w-md">
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
    <div class="flex flex-col rounded-xl border border-gray-800 p-6 w-full ml-4">
      <!-- Title -->
      <h2 class="text-2xl font-bold m-4 text-center">Lista de amigos</h2>
      <hr />
      <!-- Frined List -->
      <PlayerListCompact :players="friends" />
    </div>
  </section>
  <footer></footer>
</template>

<script setup>
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  const signout = () => {
    store.signout();
    navigateTo('/');
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
    socket.emit('createRoom', 'RoomNameHere');
    socket.on('Access code', (code) => {
      store.setRoom(code);
      navigateTo('/lobby');
    });
  };

  // Join room
  const joinRoomCode = ref('');
  function joinRoom() {
    socket.emit('joinRoom', 'RoomNameHere', joinRoomCode.value);
    //navigateTo('/lobby');
  }
</script>
