<template>
  <Head>
    <Title>WealthWars - In game</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <!-- Notification -->
  <Notification ref="notification" />
  <!-- Achievement notification -->
  <AchievementNotification ref="achievementNotification" />
  <!-- Popup -->
  <Popup ref="popup" />
  <!-- Dialogs -->
  <Dialog :show="isOpenAddFactoryDialog" @click-outside="isOpenAddFactoryDialog = false">
    <template #title>
      <span v-if="coins >= 15">¿Deseas añadir una fábrica a <b>{{ selected }}</b>?</span>
      <span v-else>No puedes añadir una fábrica. Una fábrica cuesta 15 monedas y tú tienes {{ coins }}.</span>
    </template>
    <template #buttons>
      <Button v-if="coins >= 15" @click="addFactory(selectedCode)" class="mr-4">Sí</Button>
      <ButtonRed v-if="coins >= 15" @click="isOpenAddFactoryDialog = false">No</ButtonRed>
      <ButtonRed v-else @click="isOpenAddFactoryDialog = false">Cerrar ventana</ButtonRed>
    </template>
  </Dialog>
  <Dialog :show="isOpenAddTroopsDialog" @click-outside="isOpenAddTroopsDialog = false">
    <template #title
      >¿Deseas añadir tropas a <b>{{ selected }}</b
      >?</template
    >
    <template #description>
      <div v-if="coins >= 2">
        <p>
          Selecciona el número de tropas:
          <b> {{ actionQuantity }} {{ actionQuantity == 1 ? 'tropa' : 'tropas' }} </b>
        </p>
        <InputRange v-model:value="actionQuantity" min="0" :max="parseInt(coins / 2)" class="w-full mt-6 mb-2" />
      </div>
      <p>Cada tropa cuesta 2 monedas, la cantidad que posees es inferior.</p>
    </template>
    <template #buttons>
      <Button v-if="coins >= 2" @click="addTroops(selectedCode, actionQuantity)" class="mr-4">Sí</Button>
      <ButtonRed v-if="coins >= 2" @click="isOpenAddTroopsDialog = false">No</ButtonRed>
      <ButtonRed v-if="coins < 2" @click="isOpenAddTroopsDialog = false">Cerrar ventana</ButtonRed>
    </template>
  </Dialog>
  <Dialog :show="isOpenAttackDialog" @click-outside="isOpenAttackDialog = false">
    <template #title
      >¿Deseas atacar <b>{{ state.map[attackTo].name }}</b> desde <b>{{ state.map[attackFrom].name }}</b
      >?</template
    >
    <template #description>
      <p>
        Selecciona el número de tropas que emplearás en el ataque:
        <b> {{ actionQuantity }} {{ actionQuantity == 1 ? 'tropa' : 'tropas' }} </b>
      </p>
      <InputRange
        v-model:value="actionQuantity"
        min="0"
        :max="state.map[attackFrom].troops - 1"
        class="w-full mt-6 mb-2"
      />
    </template>
    <template #buttons>
      <Button @click="attack(attackFrom, attackTo, actionQuantity)" class="mr-4">Sí</Button>
      <ButtonRed @click="isOpenAttackDialog = false">No</ButtonRed>
    </template>
  </Dialog>
  <Dialog :show="isOpenMoveDialog" @click-outside="isOpenMoveDialog = false">
    <template #title
      >¿Cuántas tropas deseas mover de <b>{{ state.map[moveFrom].name }}</b> a <b>{{ state.map[moveTo].name }}</b
      >?</template
    >
    <template #description>
      <p>
        Selecciona el número de tropas que moverás:
        <b> {{ actionQuantity }} {{ actionQuantity == 1 ? 'tropa' : 'tropas' }} </b>
      </p>
      <InputRange
        v-model:value="actionQuantity"
        min="0"
        :max="state.map[moveFrom].troops - 1"
        class="w-full mt-6 mb-2"
      />
    </template>
    <template #buttons>
      <Button @click="move(moveFrom, moveTo, actionQuantity)" class="mr-4">Sí</Button>
      <ButtonRed @click="isOpenMoveDialog = false">No</ButtonRed>
    </template>
  </Dialog>
  <main class="w-full h-screen flex flex-row overflow-hidden">
    <!-- Game board -->
    <section
      class="grow relative"
    >
      <!-- Surrender -->
      <ButtonRed v-if="inGame" class="m-8 absolute" @click="openModal">
        Rendirse
        <IconFlag class="ml-2" />
      </ButtonRed>
      <Dialog :show="isOpenQuitDialog" @click-outside="closeModal">
        <template #title>¿Estás seguro de que quieres rendirte?</template>
        <template #buttons>
          <ButtonRed @click="surrender" class="mr-4">Sí</ButtonRed>
          <ButtonDark @click="closeModal">No</ButtonDark>
        </template>
      </Dialog>
      <!-- Leave -->
      <ButtonRed v-if="!inGame" class="m-8 absolute" @click="quitRoom">
        Salir
        <IconArrowBarToRight class="ml-2" />
      </ButtonRed>
      <!--Audio-->
      <Audio audio="/audio/game_music.mp3" class="m-8 absolute right-0"></Audio>
      <!-- Map -->
      <div class="p-8 flex flex-row justify-between" style="height: 80vh">
        <!-- Players -->
        <div class="flex-none flex flex-col justify-center">
          <Players :players="state.players" :turn="state.turn" />
        </div>
        <div class="w-full pl-8 flex flex-row justify-center">
          <Map
            :state="state.map"
            :animatedTerritories="animatedTerritories"
            @select="(territory) => selectTerritory(territory)"
          ></Map>
        </div>
      </div>
      <!-- Actions -->
      <div class="px-8 pb-8">
        <Stepper :step="step" :coins="coins" :action="currentAction" @trigger="(action) => runAction(action)"></Stepper>
        <p v-if="selected" class="py-2">Territorio seleccionado: {{ selected }}</p>
        <!-- <p v-if="attackTerritories" class="py-2">Territorios atacables: {{ attackTerritories }}</p> -->
        <!-- <p v-if="myTerritories" class="py-2">Mis Territorio: {{ myTerritories }}</p> -->
      </div>
    </section>
    <!-- Chat -->
    <section class="flex-none w-72 xl:w-80 2xl:w-96 shadow-md border-l border-primary-dark flex flex-col">
      <Chat :messages="messages" :players="state.players" :me="me" class="relative">
        <EmojiPicker v-show="isOpenEmojiDialog" class="absolute ml-4 mb-4" :native="true" @select="onSelectEmoji" />
      </Chat>
      <div class="p-4 w-full flex flex-row border-t border-primary-dark">
        <span @click="isOpenEmojiDialog = !isOpenEmojiDialog">
          <IconMoodSmile class="h-10 w-10 cursor-pointer text-white" />
        </span>
        <InputText
          class="w-full ml-4"
          @keydown.enter="sendMessage"
          placeholder="Escribe aquí"
          v-model:value="message"
          @click="isOpenEmojiDialog = false"
        />
        <ButtonDark class="ml-4" style="padding-left: 7px; padding-right: 9px" @click="sendMessage">
          <IconSend />
        </ButtonDark>
      </div>
    </section>
  </main>
</template>

<script setup>
  import EmojiPicker from 'vue3-emoji-picker';
  import 'vue3-emoji-picker/css';
  import { IconFlag, IconSend, IconArrowBarToRight, IconMoodSmile } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  import { io } from 'socket.io-client';
  import { dummyState } from '@/public/dummy_state.js';

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const api = useAppConfig().api;

  const store = useUserStore();
  store.connectedPlayers = null;

  // SocketIO
  const socket = io(api, {
    withCredentials: true,
  });

  // Achievement
  const achievementNotification = ref(null);
  socket.on('achievementUnlocked', (achievement) => {
    achievementNotification.value.show(achievement.title, achievement.description, achievement.image_url);
  });

  // If user has surrendered, inGame is false and the option to leave visualization appears
  const inGame = ref(true);

  // Notification
  const notification = ref(null);
  const popup = ref(null);

  // Game state
  const state = ref(dummyState);
  socket.emit('sendMap');
  socket.on('mapSent', (map) => {
    state.value = map;
    if (state.value.turn == me.value) {
      // It's my turn
      if (state.value.phase == 0) {
        step.value = 1;
      }
    } else {
      // Not my turn
      step.value = 0;
    }
    console.log(map);
  });

  // Compute who I am
  const me = computed(() => {
    const players = state.value.players;
    let index = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].email.trim() == store.user.email.trim()) {
        index = i; // Return the index if email matches
      }
    }
    console.log("I'm player " + index);
    return index;
  });

  // Coins
  const coins = computed(() => {
    return state.value.players[me.value].coins;
  });

  // Quit dialog
  const isOpenQuitDialog = ref(false);
  function openModal() {
    isOpenQuitDialog.value = true;
  }
  function closeModal() {
    isOpenQuitDialog.value = false;
  }
  function surrender() {
    socket.emit('surrender');
    inGame.value = false;
    closeModal();
  }
  function quitRoom() {
    socket.emit('leaveRoom');
    store.setRoom(null);
    navigateTo('/dashboard');
  }
  socket.on('playerLeftRoom', (player) => {
    notification.value.show(player + ' abandonó la partida');
  });

  // Surrender
  socket.on('userSurrendered', (player) => {
    const players = state.value.players;
    let name = '';
    for (let i = 0; i < players.length; i++) {
      if (players[i].email.trim() == player.trim()) {
        name = players[i].name; // Return the index if email matches
      }
    }
    notification.value.show(name + ' se ha rendido');
  });

  // Select territory
  const selected = ref();
  const selectedCode = ref(null);
  const animatedTerritories = ref([]);
  const currentAction = ref(null);

  const isOpenAddFactoryDialog = ref(false);
  const isOpenAddTroopsDialog = ref(false);
  const isOpenAttackDialog = ref(false);
  const isOpenMoveDialog = ref(false);

  const attackFrom = ref('');
  const attackTo = ref('');
  const canAttackTo = ref(null); // List of territories that can be attacked
  const moveFrom = ref('');
  const moveTo = ref('');
  const actionQuantity = ref(0);

  function selectTerritory(territory) {
    selected.value = state.value.map[territory].name;
    selectedCode.value = territory;

    switch (currentAction.value) {
      case 'add-factories':
        if (myTerritories.value.includes(selectedCode.value)) {
          isOpenAddFactoryDialog.value = true;
        }
        break;
      case 'add-troops':
        if (myTerritories.value.includes(selectedCode.value)) {
          isOpenAddTroopsDialog.value = true;
        }
        break;
      case 'attack':
        //
        if (myTerritories.value.includes(selectedCode.value)) {
          attackFrom.value = selectedCode.value;
          animatedTerritories.value = attackTerritories.value;
          canAttackTo.value = attackTerritories.value;
          currentAction.value = 'attacking';
          //step.value = 4;
        }
        break;
      case 'attacking':
        if (canAttackTo.value.includes(selectedCode.value)) {
          attackTo.value = selectedCode.value;
          isOpenAttackDialog.value = true;
        }
      case 'move-troops':
        if (myTerritories.value.includes(selectedCode.value)) {
          moveFrom.value = selectedCode.value;
          currentAction.value = 'moving';
        }
        break;
      case 'moving':
        if (myTerritories.value.includes(selectedCode.value)) {
          moveTo.value = selectedCode.value;
          isOpenMoveDialog.value = true;
        }
        break;
      default:
        break;
    }
  }

  function addFactory(territory) {
    console.log('Añadiendo una fábrica en ' + territory);
    socket.emit('buyActives', 'factory', territory, 1);
    animatedTerritories.value = [];
    isOpenAddFactoryDialog.value = false;
  }

  function addTroops(territory, troops) {
    console.log('Añadiendo ' + troops + ' tropas en ' + territory);
    socket.emit('buyActives', 'troop', territory, troops);
    actionQuantity.value = 0;
    animatedTerritories.value = [];
    isOpenAddTroopsDialog.value = false;
  }

  function attack(from, to, troops) {
    console.log('Atacando desde ' + from + ' a ' + to + ' con ' + troops + ' tropas');
    socket.emit('attackTerritories', from, to, troops);
    actionQuantity.value = 0;
    animatedTerritories.value = [];
    isOpenAttackDialog.value = false;
    // Sound effect
    const audio = new Audio('/audio/explosion_attack.mp3');
    audio.loop = false;
    audio.volume = 0.1;
    audio.play();
  }

  function move(from, to, troops) {
    console.log('Moviendo ' + troops + ' tropas desde ' + from + ' a ' + to);
    socket.emit('moveTroops', from, to, troops);
    actionQuantity.value = 0;
    animatedTerritories.value = [];
    isOpenMoveDialog.value = false;
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
        animatedTerritories.value = myTerritories.value;
        break;
      case 'add-troops':
        animatedTerritories.value = myTerritories.value;
        break;
      case 'go-to-step-2':
        animatedTerritories.value = [];
        step.value = 2; // Go to step 2 (Attack)
        socket.emit('nextPhase');
        break;
      case 'attack':
        animatedTerritories.value = myTerritories.value;
        /*if (selectedCode.value && myTerritories.includes(selectedCode.value)) {
          animatedTerritories.value = attackTerritories.value;
          step.value = 4;
        }*/
        break;
      case 'go-to-step-3': // Go to step 3 (Move troops)
        animatedTerritories.value = [];
        selected.value = null;
        selectedCode.value = null;
        step.value = 3;
        socket.emit('nextPhase');
        break;
      case 'move-troops':
        animatedTerritories.value = myTerritories.value;
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
        socket.emit('nextTurn');
        break;
      default:
        break;
    }
    console.log(action);
  }

  // Other player has attacked
  socket.on('attack', (message) => {
    // { email: "x@email.com", from: "TO", to: "M", numberTroops: "3" }
    if (message.email != store.user.email) {
      // Get attack data
      const players = state.value.players;
      let name = '';
      for (let i = 0; i < players.length; i++) {
        if (players[i].email.trim() == message.email) {
          name = players[i].name; // Return the index if email matches
        }
      }
      const from = state.value.map[message.from].name;
      const to = state.value.map[message.to].name;
      popup.value.showMessage(name + ' está atancando ' + to + ' desde ' + from);
    }
  });

  // Chat
  const message = ref('');
  const messages = ref([]);
  const isOpenEmojiDialog = ref(false);

  function onSelectEmoji(emoji) {
    message.value += emoji.i;
    //isOpenEmojiDialog.value = false;
  }

  function sendMessage() {
    // Check message value is not empty
    if (message.value != '') {
      socket.emit('sendMessage', message.value);
      // Clean message value
      message.value = '';
    }
    isOpenEmojiDialog.value = false;
  }

  socket.on('messageReceived', (message) => {
    const text = message.message;
    const email = message.user;
    let playerIndex = 0;
    for (let [index, player] of state.value.players.entries()) {
      if (player.email.trim() == email.trim()) {
        playerIndex = index;
      }
    }
    messages.value.unshift({
      player: playerIndex,
      text: text,
    });
  });

  // Popup messages & Victory
  /*socket.on('victory', (message) => {
    console.log(message);
    popup.value.showVictory(store.user.name);
  });*/

  // Game over & Ranking
  socket.on('gameOver', (gameOver) => {
    //alert('Game over');
    console.log(gameOver);
    if (gameOver.ranking[0].email.trim() == store.user.email) {
      popup.value.showVictory(store.user.name);
    } else {
      popup.value.showGameOver(gameOver.ranking);
    }
  });

  // Territories animation
  const myTerritories = computed(() => {
    return Object.keys(state.value.map).filter((key) => state.value.map[key].player === me.value);
  });

  const adjacentTerritories = ref({});

  const attackTerritories = computed(() => {
    if (!selectedCode.value || !myTerritories.value.includes(selectedCode.value)) return null;

    const selectedTerritory = selectedCode.value;
    const myPlayerCode = me.value; // Assuming me is the player code (e.g., 3)

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
