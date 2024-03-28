<template>
  <Head>
    <Title>WealthWars - In game</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <main class="w-full h-screen flex flex-row overflow-hidden">
    <!-- Game board -->
    <section class="grow relative">
      <!-- Leave -->
      <ButtonRed class="m-8 absolute" @click="openModal"> Abandonar <IconArrowBarToRight class="ml-2" /> </ButtonRed>
      <Dialog :show="isOpenQuitDialog">
        <template v-slot:title> ¿Estás seguro que quieres abandonar la partida? </template>
        <template v-slot:buttons>
          <ButtonRed @click="closeModal & navigateTo('/dashboard')" class="mr-4"> Sí </ButtonRed>
          <ButtonDark @click="closeModal">No</ButtonDark>
        </template>
      </Dialog>
      <!-- Map -->
      <div class="p-8 flex flex-row justify-center" style="height: 80vh">
        <Map :state="state.map" @select="(territory) => showTerritory(territory)"></Map>
      </div>
      <!-- Actions -->
      <div class="px-8 pb-8">
        <Stepper :step="step" @trigger="(action) => runAction(action)"></Stepper>
        <p v-if="selected" class="py-2">Territorio seleccionado: {{ selected }}</p>
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

  // Protect route against unlogged users
  definePageMeta({
    middleware: ['auth'],
  });

  const store = useUserStore();
  const token = store.user.token;
  const headers = { Authorization: `Bearer ${token}` };

  // Quit dialog
  const isOpenQuitDialog = ref(false);
  function openModal() {
    isOpenQuitDialog.value = true;
  }
  function closeModal() {
    isOpenQuitDialog.value = false;
  }

  // Select territory
  const selected = ref(null);

  function showTerritory(territory) {
    selected.value = state.map[territory].name;
  }

  // Steps
  // Step 0 - Not your turn
  // Step 1 - Get paid
  // Step 2 - Invest money & Move troops
  // Step 3 - Attack
  const step = ref(1);

  function runAction(action) {
    switch (action) {
      case 'get-paid':
        step.value = 2; // Go to step 2 (Invest and move troops)
        break;
      case 'add-factories':
        break;
      case 'add-troops':
        break;
      case 'move-troops':
        break;
      case 'go-to-step-3': // Go to step 3 (Attack)
        step.value = 3;
        break;
      case 'attack':
        break;
      case 'end-turn':
        step.value = 0;
        break;
      default:
        break;
    }
    console.log(action);
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

  // Game state
  const state = {
    turn: 0,
    players: [
  {
    name: 'Jaime',
    email: 'jaime@gmail.com', // Puede ser otro identificador (necesario para solicitudes de amistad)
    picture: 'sdffd' // La que devuelva google al iniciar sesión
  }, 
  {
    name: 'Javier',
    email: 'javier@gmail.com',
    picture: 'sfsff'
  }, 
  {
    name: 'Jorge',
    email: 'jorge@gmail.com',
    picture: 'sfdsfd'
  }, {
    name: 'Job',
    email: 'job@gmail.com',
    picture: 'sfddsff'
  }],
    map: {
      A: {
        name: 'Alicante',
        player: 0,
        troops: 3,
        factories: 0,
      },
      AB: {
        name: 'Albacete',
        player: 1,
        troops: 2,
        factories: 1,
      },
      AL: {
        name: 'Alentejo - Algarve',
        player: 2,
        troops: 3,
        factories: 0,
      },
      AM: {
        name: 'Almería',
        player: 3,
        troops: 3,
        factories: 1,
      },
      AS: {
        name: 'Ávila - Segovia',
        player: 0,
        troops: 3,
        factories: 1,
      },
      BA: {
        name: 'Badajoz',
        player: 1,
        troops: 3,
        factories: 0,
      },
      BG: {
        name: 'Barcelona - Gerona',
        player: 2,
        troops: 4,
        factories: 1,
      },
      BU: {
        name: 'Burgos',
        player: 3,
        troops: 3,
        factories: 0,
      },
      C: {
        name: 'La Coruña',
        player: 0,
        troops: 3,
        factories: 1,
      },
      CC: {
        name: 'Cáceres',
        player: 1,
        troops: 3,
        factories: 0,
      },
      CO: {
        name: 'Córdoba',
        player: 2,
        troops: 3,
        factories: 0,
      },
      CR: {
        name: 'Ciudad Real',
        player: 3,
        troops: 3,
        factories: 0,
      },
      CS: {
        name: 'Castellón',
        player: 0,
        troops: 3,
        factories: 0,
      },
      CU: {
        name: 'Cuenca',
        player: 1,
        troops: 3,
        factories: 0,
      },
      GR: {
        name: 'Granada',
        player: 2,
        troops: 3,
        factories: 0,
      },
      GU: {
        name: 'Guadalajara',
        player: 3,
        troops: 3,
        factories: 0,
      },
      H: {
        name: 'Huelva',
        player: 0,
        troops: 3,
        factories: 0,
      },
      HU: {
        name: 'Huesca',
        player: 1,
        troops: 3,
        factories: 0,
      },
      J: {
        name: 'Jaén',
        player: 2,
        troops: 3,
        factories: 1,
      },
      L: {
        name: 'Lérida',
        player: 3,
        troops: 2,
        factories: 0,
      },
      LE: {
        name: 'León',
        player: 0,
        troops: 3,
        factories: 0,
      },
      LN: {
        name: 'La Rioja - Navarra',
        player: 1,
        troops: 3,
        factories: 1,
      },
      LU: {
        name: 'Lugo',
        player: 2,
        troops: 1,
        factories: 0,
      },
      M: {
        name: 'Madrid',
        player: 3,
        troops: 3,
        factories: 1,
      },
      MC: {
        name: 'Málaga - Cádiz',
        player: 0,
        troops: 3,
        factories: 0,
      },
      MU: {
        name: 'Murcia',
        player: 1,
        troops: 3,
        factories: 0,
      },
      O: {
        name: 'Asturias',
        player: 2,
        troops: 3,
        factories: 0,
      },
      PC: {
        name: 'Portugal Centro',
        player: 3,
        troops: 3,
        factories: 0,
      },
      PN: {
        name: 'Portugal Norte',
        player: 0,
        troops: 3,
        factories: 0,
      },
      PO: {
        name: 'Pontevedra - Orense',
        player: 1,
        troops: 3,
        factories: 0,
      },
      PV: {
        name: 'País Vasco',
        player: 2,
        troops: 3,
        factories: 1,
      },
      S: {
        name: 'Cantabria',
        player: 3,
        troops: 3,
        factories: 0,
      },
      SA: {
        name: 'Salamanca',
        player: 0,
        troops: 3,
        factories: 0,
      },
      SE: {
        name: 'Sevilla',
        player: 1,
        troops: 3,
        factories: 0,
      },
      SO: {
        name: 'Soria',
        player: 2,
        troops: 3,
        factories: 0,
      },
      T: {
        name: 'Tarragona',
        player: 3,
        troops: 3,
        factories: 1,
      },
      TE: {
        name: 'Teruel',
        player: 0,
        troops: 3,
        factories: 0,
      },
      TO: {
        name: 'Toledo',
        player: 1,
        troops: 3,
        factories: 0,
      },
      V: {
        name: 'Valencia',
        player: 2,
        troops: 3,
        factories: 0,
      },
      VP: {
        name: 'Valladolid - Palencia',
        player: 3,
        troops: 3,
        factories: 0,
      },
      Z: {
        name: 'Zaragoza',
        player: 0,
        troops: 2,
        factories: 1,
      },
      ZA: {
        name: 'Zamora',
        player: 1,
        troops: 3,
        factories: 0,
      },
    },
  };
</script>
