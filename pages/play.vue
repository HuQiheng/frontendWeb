<template>
  <Head>
    <Title>WealthWars - In game</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <main class="w-full h-screen flex flex-row">
    <!-- Game board -->
    <section class="grow">
      <!-- Map -->
      <div class="p-8 flex flex-row justify-center" style="height: 80vh">
        <Map 
          :state="state"
          @select="(territory) => showTerritory(territory)"
        ></Map>
      </div>
      <!-- Actions -->
      <div class="p-8">
        <p v-if="selected">Territorio seleccionado: {{ selected }}</p>
      </div>
    </section>
    <!-- Chat -->
    <section class="w-96 border-l-2 border-slate-300 flex flex-col">
      <div class="message-container">
        <div class="messsage"></div>
      </div>
      <div class="p-4 w-full flex flex-row border-t-2 border-slate-300">
        <InputText class="w-full" placeholder="Escribe aquí"/>
        <Button class="ml-4"><IconSend/></Button>
      </div>
    </section>
  </main>
</template>

<style>
.message-container {
  @apply h-full;
}
</style>

<script setup>
import { IconSend } from '@tabler/icons-vue';

const selected = ref(null);

function showTerritory(territory) {
  selected.value = state[territory].name;
}

// Game state
const state = {
  "A": { 
    name: "Alicante",
    player: 0,
  },
  "AB": { 
    name: "Albacete",
    player: 1,
  },
  "AL": { 
    name: "Alentejo - Algarve",
    player: 2,
  },
  "AM": { 
    name: "Almería",
    player: 3,
  },
  "AS": {
    name: "Ávila - Segovia",
    player: 0,
  },
  "BA": {
    name: "Badajoz",
    player: 1,
  },
  "BG": {
    name: "Barcelona - Gerona",
    player: 2,
  },
  "BU": {
    name: "Burgos",
    player: 3,
  },
  "C": {
    name: "La Coruña",
    player: 0,
  },
  "CC": {
    name: "Cáceres",
    player: 1,
  },
  "CO": {
    name: "Córdoba",
    player: 2,
  },
  "CR": {
    name: "Ciudad Real",
    player: 3,
  },
  "CS": {
    name: "Castellón",
    player: 0,
  },
  "CU": {
    name: "Cuenca",
    player: 1,
  },
  "GR": {
    name: "Granada",
    player: 2,
  },
  "GU": {
    name: "Guadalajara",
    player: 3,
  },
  "H": {
    name: "Huelva",
    player: 0,
  },
  "HU": {
    name: "Huesca",
    player: 1,
  },
  "J": {
    name: "Jaén",
    player: 2,
  },
  "L": {
    name: "Lérida",
    player: 3,
  },
  "LE": {
    name: "León",
    player: 0,
  },
  "LN": {
    name: "La Rioja - Navarra",
    player: 1,
  },
  "LU": {
    name: "Lugo",
    player: 2,
  },
  "M": {
    name: "Madrid",
    player: 3,
  },
  "MC": {
    name: "Málaga - Cádiz",
    player: 0,
  },
  "MU": {
    name: "Murcia",
    player: 1,
  },
  "O": {
    name: "Asturias",
    player: 2,
  },
  "PC": {
    name: "Portugal Centro",
    player: 3,
  },
  "PN": {
    name: "Portugal Norte",
    player: 0,
  },
  "PO": {
    name: "Pontevedra - Orense",
    player: 1,
  },
  "PV": {
    name: "País Vasco",
    player: 2,
  },
  "S": {
    name: "Cantabria",
    player: 3,
  },
  "SA": {
    name: "Salamanca",
    player: 0,
  },
  "SE": {
    name: "Sevilla",
    player: 1,
  },
  "SO": {
    name: "Soria",
    player: 2,
  },
  "T": {
    name: "Tarragona",
    player: 3,
  },
  "TE": {
    name: "Teruel",
    player: 0,
  },
  "TO": {
    name: "Toledo",
    player: 1,
  },
  "V": {
    name: "Valencia",
    player: 2,
  },
  "VP": {
    name: "Valladolid - Palencia",
    player: 3,
  },
  "Z": {
    name: "Zaragoza",
    player: 0,
  },
  "ZA": {
    name: "Zamora",
    player: 1,
  }
}

console.log(Object.keys(state).length)
</script>