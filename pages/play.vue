<template>
  <Head>
    <Title>WealthWars - In game</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <Notification ref="notification" />
  <Dialog :show="isOpenAddFactoryDialog" @click-outside="isOpenAddFactoryDialog = false">
    <template #title>¿Deseas añadir una fábrica a {{ selected }}?</template>
    <template #buttons>
      <ButtonRed @click="addFactory(selectedCode)" class="mr-4">Sí</ButtonRed>
      <ButtonDark @click="isOpenAddFactoryDialog = false">No</ButtonDark>
    </template>
  </Dialog>
  <main class="w-full h-screen flex flex-row overflow-hidden">
    <!-- Game board -->
    <section class="grow relative">
      <!-- Leave -->
      <ButtonRed class="m-8 absolute" @click="openModal"> Abandonar <IconArrowBarToRight class="ml-2" /> </ButtonRed>
      <Dialog :show="isOpenQuitDialog" @click-outside="closeModal">
        <template #title>¿Estás seguro de que quieres abandonar la partida?</template>
        <template #buttons>
          <ButtonRed @click="quitRoom" class="mr-4">Sí</ButtonRed>
          <ButtonDark @click="closeModal">No</ButtonDark>
        </template>
      </Dialog>
      <!-- Map -->
      <div class="p-8 flex flex-row justify-center" style="height: 80vh">
        <Map
          :state="state.map"
          :animatedTerritories="animatedTerritories"
          @select="(territory) => selectTerritory(territory)"
        ></Map>
      </div>
      <!-- Actions -->
      <div class="px-8 pb-8">
        <Stepper :step="step" :coins="state.players[me].coins" @trigger="(action) => runAction(action)"></Stepper>
        <p v-if="selected" class="py-2">Territorio seleccionado: {{ selected }}</p>
        <!-- <p v-if="attackTerritories" class="py-2">Territorios atacables: {{ attackTerritories }}</p> -->
        <!-- <p v-if="myTerritories" class="py-2">Mis Territorio: {{ myTerritories }}</p> -->
      </div>
    </section>
    <!-- Chat -->
    <section class="w-96 shadow-md border border-gray-200 flex flex-col">
      <Chat :messages="messages" :players="state.players" :me="me"></Chat>
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

  // Game state
  console.log('Game state!!');
  console.log(store.gameState);
  const state = ref(store.gameState);

  /*const players = store.gameState.players;
  let me = -1;
  for (let i = 0; i < players.length; i++) {
    console.log(players[i].email);
    console.log(store.user.email);
    if (players[i].email === store.user.email) {
      me = i; // Return the index if email matches
    }
  }*/

  const me = 0;
  /*const me = computed(() => {
    const players = store.gameState.players;
    let index = -1;
    for (let i = 0; i < players.length; i++) {
      console.log(players[i].email);
      console.log(store.user.email);
      if (players[i].email === store.user.email) {
        index = i; // Return the index if email matches
      }
    }
    return index;
  });*/

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  // Quit dialog
  const isOpenQuitDialog = ref(false);
  function openModal() {
    isOpenQuitDialog.value = true;
  }
  function closeModal() {
    isOpenQuitDialog.value = false;
  }
  function quitRoom() {
    socket.emit('leaveRoom');
    navigateTo('/dashboard');
  }
  socket.on('playerLeftRoom', (player) => {
    notification.value.show(player + 'abandonó la partida');
  });

  // Select territory
  const selected = ref();
  const selectedCode = ref(null);
  const animatedTerritories = ref([]);
  const currentAction = ref(null);

  const isOpenAddFactoryDialog = ref(false);

  function selectTerritory(territory) {
    selected.value = state.value.map[territory].name;
    selectedCode.value = territory;

    switch (currentAction.value) {
      case 'add-factories':
        if (myTerritories.includes(selectedCode.value)) {
          isOpenAddFactoryDialog.value = true;
        }
        break;
      default:
        break;
    }
  }

  function addFactory(territory) {
    socket.emit('buyActives', 'factory', territory, 1);
  }

  // Steps
  // Step 0 - Not your turn
  // Step 1 - Invest money
  // Step 2 - Attack
  // Step 3 - Move troops
  const step = ref(1);

  function runAction(action) {
    currentAction.value = action;
    switch (action) {
      case 'add-factories':
        animatedTerritories.value = myTerritories;
        break;
      case 'add-troops':
        animatedTerritories.value = myTerritories;
        break;
      case 'go-to-step-2':
        step.value = 2; // Go to step 2 (Attack)
        break;
      case 'attack':
        if (selectedCode.value && myTerritories.includes(selectedCode.value)) {
          animatedTerritories.value = attackTerritories.value;
          step.value = 4;
        }
        break;
      case 'go-to-step-3': // Go to step 3 (Move troops)
        //animatedTerritories.value = myTerritories;
        selected.value = null;
        selectedCode.value = null;
        step.value = 3;
        break;
      case 'move-troops':
        animatedTerritories.value = myTerritories;
        break;
      case 'attack-territory':
        animatedTerritories.value = [];
        selected.value = null;
        selectedCode.value = null;
        step.value = 0;
        break;
      case 'end-turn':
        animatedTerritories.value = [];
        selected.value = null;
        selectedCode.value = null;
        step.value = 0;
        break;
      default:
        break;
    }
    console.log(action);
  }

  // Chat
  const message = ref('');
  const messages = ref([
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

  // Territories animation
  const myTerritories = Object.keys(state.value.map).filter((key) => state.value.map[key].player === me);

  const adjacentTerritories = ref({});

  const attackTerritories = computed(() => {
    if (!selectedCode.value || !myTerritories.includes(selectedCode.value)) return null;

    const selectedTerritory = selectedCode.value;
    const myPlayerCode = me; // Assuming me is the player code (e.g., 3)

    const selectedAdjacentTerritories = adjacentTerritories.value[selectedTerritory]?.adjacents || [];

    return selectedAdjacentTerritories.filter((adjacentCode) => {
      const adjacentPlayerCode = state.value.map[adjacentCode]?.player;
      return adjacentPlayerCode !== myPlayerCode;
    });
  });

  onMounted(async () => {
    const response = await fetch('/territories.json');
    adjacentTerritories.value = await response.json();
  });
</script>
