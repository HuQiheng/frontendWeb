<template>
  <main class="w-full h-screen flex flex-row">
    <!-- Game board -->
    <section class="grow">
      <!-- Map -->
      <div class="p-8 flex flex-row justify-center" style="height: 80vh">
        <Map @select="(territory) => showTerritory(territory)"></Map>
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
        <InputText class="w-full"/>
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
  selected.value = territories[territory];
}

// Game state
const territories = {
  "A": { 
    name: "Alicante",
    player: 0,
    factories: 0,
    troops: 2
  },
  "AB": { 
    name: "Albacete",
    player: 1,
    factories: 1,
    troops: 2
  },
  "AG": { 
    name: "Algarve",
    player: 2,
    factories: 0,
    troops: 2
  },
  "AL": { 
    name: "Almería",
    player: 3,
    factories: 0,
    troops: 2
  },
  "AS": { 
    name: "Ávila - Segovia",
    player: 0,
    factories: 0,
    troops: 2
  },
  "AT": { 
    name: "Alentejo",
    player: 1,
    factories: 0,
    troops: 2
  },
  "B": { 
    name: "Barcelona",
    player: 2,
    factories: 1,
    troops: 2
  },
  "BA": { 
    name: "Badajoz",
    player: 3,
    factories: 0,
    troops: 2
  },
  "BU": { 
    name: "Burgos",
    player: 0,
    factories: 0,
    troops: 2
  },
  "C": { 
    name: "La Coruña",
    player: 1,
    factories: 0,
    troops: 2
  },
  "CA": { 
    name: "Cádiz",
    player: 2,
    factories: 0,
    troops: 2
  },
  "CC": { 
    name: "Cáceres",
    player: 3,
    factories: 0,
    troops: 2
  },
  "CO": { 
    name: "Córdoba",
    player: 0,
    factories: 0,
    troops: 2
  },
  "CR": { 
    name: "Ciudad Real",
    player: 1,
    factories: 0,
    troops: 2
  },
  "CS": { 
    name: "Castellón",
    player: 2,
    factories: 0,
    troops: 2
  },
  "CU": {
    name: "Cuenca",
    player: 3,
    factories: 0,
    troops: 2
  },
  "GE": { 
    name: "Gerona",
    player: 0,
    factories: 0,
    troops: 2
  },
  "GR": { 
    name: "Granada",
    player: 1,
    factories: 0,
    troops: 2
  },
  "GU": { 
    name: "Guadalajara",
    player: 2,
    factories: 0,
    troops: 2
  },
  "H": { 
    name: "Huelva",
    player: 3,
    factories: 0,
    troops: 2
  },
  "HU": { 
    name: "Huesca",
    player: 0,
    factories: 0,
    troops: 2
  },
  "J": { 
    name: "Jaén",
    player: 1,
    factories: 0,
    troops: 2
  },
  "L": {
    name: "Lérida",
    player: 2,
    factories: 0,
    troops: 2
  },
  "LE": { 
    name: "León",
    player: 3,
    factories: 0,
    troops: 2
  },
  "LN": { 
    name: "La Rioja - Navarra",
    player: 0,
    factories: 0,
    troops: 2
  },
  "LU": {
    name: "Lugo",
    player: 1,
    factories: 0,
    troops: 2
  },
  "M": { 
    name: "Madrid",
    player: 2,
    factories: 1,
    troops: 2
  },
  "MA": { 
    name: "Málaga",
    player: 3,
    factories: 0,
    troops: 2
  },
  "MC": {
    name: "Murcia",
    player: 0,
    factories: 0,
    troops: 2
  },
  "ML": { 
    name: "Melilla",
    player: 1,
    factories: 0,
    troops: 2
  },
  "MU": { 
    name: "Murcia",
    player: 2,
    factories: 0,
    troops: 2
  },
  "O": { name: "Asturias" },
  "PC": { name: "Portugal Centro" },
  "PN": { name: "Portugal Norte" },
  "PO": { name: "Pontevedra - Orense" },
  "PV": { name: "País Vasco" },
  "S": { name: "Cantabria" },
  "SA": { name: "Salamanca" },
  "SE": { name: "Sevilla" },
  "SG": { name: "Segovia" },
  "SO": { name: "Soria" },
  "T": { name: "Tarragona" },
  "TE": { name: "Teruel" },
  "TO": { name: "Toledo" },
  "V": { name: "Valencia" },
  "VP": { name: "Valladolid - Palencia" },
  "Z": { name: "Zaragoza" },
  "ZA": { name: "Zamora" }
}

console.log(Object.keys(territories).length)
</script>