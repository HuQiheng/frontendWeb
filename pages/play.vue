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
    <section class="w-96 border-l border-gray-300"></section>
  </main>
</template>

<script setup>
  const selected = ref(null);

  function showTerritory(territory) {
    selected.value = territories[territory];
  }

  // Define territories
  const territories = {
    "A": "Alicante",
    "AB": "Albacete",
    "AG": "Algarve",
    "AL": "Almería",
    "AT": "Alentejo",
    "AV": "Ávila",
    "B": "Barcelona",
    "BA": "Badajoz",
    "BU": "Burgos",
    "C": "La Coruña",
    "CA": "Cádiz",
    "CC": "Cáceres",
    "CE": "Ceuta",
    "CI": "Ciudad Real",
    "CO": "Córdoba",
    "CR": "Ciudad Real",
    "CS": "Castellón",
    "CU": "Cuenca",
    "GC": "Las Palmas",
    "GE": "Gerona",
    "GR": "Granada",
    "GU": "Guadalajara",
    "H": "Huelva",
    "HU": "Huesca",
    "IB": "Baleares",
    "J": "Jaén",
    "L": "Lérida",
    "LE": "León",
    "LO": "La Rioja",
    "LU": "Lugo",
    "M": "Madrid",
    "MA": "Málaga",
    "MC": "Murcia",
    "ML": "Melilla",
    "MU": "Murcia",
    "NA": "Navarra",
    "O": "Asturias",
    "OR": "Orense",
    "P": "Palencia",
    "PC": "Portugal Centro",
    "PN": "Portugal Norte",
    "PO": "Pontevedra",
    "PV": "País Vasco",
    "S": "Cantabria",
    "SA": "Salamanca",
    "SE": "Sevilla",
    "SG": "Segovia",
    "SO": "Soria",
    "T": "Tarragona",
    "TE": "Teruel",
    "TF": "Santa Cruz de Tenerife",
    "TO": "Toledo",
    "V": "Valencia",
    "VA": "Valladolid",
    "Z": "Zaragoza",
    "ZA": "Zamora"
  }
</script>