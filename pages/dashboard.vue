<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <Notification ref="notification" />
  <GameInvitation ref="invitation" @accept="handleAccept" />
  <main class="w-full h-screen flex flex-col">
    <!-- Top section -->
    <section class="flex-1 justify-center items-center p-6">
      <!-- section class="flex flex-col justify-center items-center" last -->
      <div class="rounded-xl border shadow-md p-6">
        <!-- User's profile settings -->
        <div class="top-14 flex flex-col justify-center items-center">
          <img
            v-if="store.user.picture"
            :src="store.user.picture"
            referrerPolicy="no-referrer"
            alt="User Picture"
            class="rounded-full"
            style="width: 180px; height: 180px"
          />
          <img v-else src="/profile.svg" alt="User Picture" style="width: 180px; height: 180px" />
          <p class="m-6 text-xl text-g-800">{{ store.user.name }}</p>
          <!-- This is not completed yet-->
          <p class="mb-3 text-lg text-g-800">Victorias: 0 🏆</p>
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
    <!-- Bottom section -->
    <section class="flex-1 flex flex-col xl:flex-row">
      <!-- Left side, match related-->
      <div class="flex-1 p-6">
        <div class="flex flex-col w-full h-full rounded-xl border shadow-md p-6">
          <h2 class="flex text-2xl font-bold m-4 text-center justify-center w-full">Juego</h2>
          <hr />
          <!-- Start new match -->
          <div class="flex flex-grow items-center justify-center w-full">
            <div class="flex m-6 justify-center w-full">
              <Button @click="createRoom">CREAR PARTIDA</Button>
            </div>
          </div>
          <hr />
          <!-- Join match -->
          <div class="flex flex-row flex-grow justify-center items-center w-full">
            <div class="flex flex-row flex-grow p-4 m-4">
              <InputText
                class="flex-grow flex text-center m-4"
                @keydown.enter="joinRoom"
                placeholder="Introduce código de invitación"
                v-model:value="joinRoomCode"
              />
              <Button class="m-4" @click="joinRoom">UNIRSE</Button>
            </div>
          </div>
        </div>
      </div>
      <!-- Right side, friends related-->
      <div class="flex-1 p-6">
        <div class="flex flex-col h-full rounded-xl border shadow-md p-6 w-full">
          <!-- Title -->
          <h2 class="text-2xl font-bold m-4 text-center">Lista de amigos</h2>
          <hr />
          <!-- Friend Searcher -->
          <div class="flex flex-row m-6">
            <!--<img src="/zoom.svg" alt="Search icon" />-->
            <InvitationsRequest />
            <InputText
              class="flex-grow text-center m-4"
              @keydown.enter="sendFriendRequest"
              placeholder="Introduce el correo del amigo"
              v-model:value="addFriendMail"
            />
            <Button class="m-4" @click="sendFriendRequest">AÑADIR</Button>
          </div>
          <hr />
          <!-- Friend List -->
          <PlayerListCompact :players="friends" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { IconArrowBarToRight, IconMail } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();

  // Notification
  const notification = ref(null);

  // Game invitation
  const invitation = ref(null);

  // Function to handle the accept event
  function handleAccept() {
    joinRoomCode.value = store.getRoom();
    joinRoom();
    // Perform actions needed when the accept event occurs
  }

  const signout = () => {
    navigateTo('/signout');
  };

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
    console.log(store.user.room);
    navigateTo('/lobby');
  });

  // Join room
  const joinRoomCode = ref('');
  function joinRoom() {
    socket.emit('joinRoom', joinRoomCode.value);
  }

  socket.on('roomAccess', (code) => {
    store.setRoom(code);
  });

  socket.on('roomJoinError', () => {
    notification.value.show('Error al entrar a la sala');
  });

  socket.on('nonExistingRoom', () => {
    notification.value.show('La sala no existe');
  });

  // This event can only be received if the user is in a room
  socket.on('connectedPlayers', (playerList) => {
    store.connectedPlayers = playerList.map((player) => {
      return { name: player.username.trim(), email: player.email.trim(), picture: player.picture };
    });
    navigateTo('/lobby');
  });

  socket.on('invitationRecevied', (response) => {
    invitation.value.notificate(response.userInfo, response.userCode);
  });

  // Add a friend
  const addFriendMail = ref('');

  async function sendFriendRequest() {
    try {
      console.log(api);
      const response = await fetch(api + '/users/' + store.user.email + '/friendRequests', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: addFriendMail.value }),
      });

      if (!response.ok) {
        notification.value.show('Error mandando solicitud de amistad.');
        throw new Error('Error sending friend request');
      }

      notification.value.show('Invitación enviada.');
      console.log(addFriendMail.value);
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  }
</script>
