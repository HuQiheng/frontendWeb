<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <section class="m-6">
    <!-- Settings part, non related with the user -->
    <Button class="m-4"><NuxtLink to="/play">Jugar</NuxtLink></Button>
    <ButtonRed class="w-36 m-4" @click="signout">Cerrar Sesión</ButtonRed>
    <RemoveAccount/>
  </section>
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
    </div>
  </section>
  <hr />
  <section class="flex flex-row m-6">
    <!-- Left side, match related-->
    <div class="flex flex-col items-center rounded-xl border border-gray-800 p-6 w-full mr-4">
      <h2 class="text-2xl font-bold m-4">Juego</h2>
      <!-- Start new match -->
      <div class="m-6">
        <NuxtLink to="/lobby"><Button>CREAR PARTIDA</Button></NuxtLink>
      </div>

      <hr />

      <!-- Join match -->
      <div class="flex flex-row justify-center m-6 w-full max-w-md">
        <div class="flex flex-row w-full max-w-md">
          <InputText class="flex-grow text-center m-4" placeholder="Introduce código de invitación" />
          <Button class="m-4">UNIRSE</Button>
        </div>
      </div>
    </div>
    <!-- Right side, friends related-->
    <div class="flex flex-col rounded-xl border border-gray-800 p-6 w-full ml-4">
      <!-- Title -->
      <h2 class="text-2xl font-bold m-4 text-center">Lista de amigos</h2>
      <!-- Friend Searcher -->
      <div class="flex flex-row p-4 m-4">
        <img src="/zoom.svg" alt="Search icon" />
        <InputText class="flex-grow text-center m-4" placeholder="Introduce código de amigo" />
        <Button class="m-4">UNIRSE</Button>
      </div>
      <hr />
      <!-- Frined List -->
      <PlayerListCompact :players="friends" />
    </div>
  </section>
  <footer></footer>
</template>

<script setup>
  import { useUserStore } from '~/stores';
  import { io } from "socket.io-client";

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

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
  const socket = io("http://localhost:3010");
</script>
