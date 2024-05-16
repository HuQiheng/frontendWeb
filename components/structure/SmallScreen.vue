<template>
  <div 
    v-show="showSmallScreen" 
    class="w-screen h-screen bg-primary fixed z-50 flex flex-row justify-center items-center"
  >
    <div class="p-8 text-white flex flex-col justify-center items-center">
      <h2 class="mb-6 text-bold text-2xl text-center">Hemos detectado un tamaño de pantalla muy pequeño</h2>
      <p class="mb-4 text-center">Si estás desde un móvil, te recomendamos descargarte nuestra versión móvil.</p>
      <ButtonDark @click="openReleases">Descargar</ButtonDark>
    </div>
  </div>
</template>

<script setup>
const showSmallScreen = ref(false);

function openReleases() {
  window.open('https://github.com/UNIZAR-30226-2024-12/frontendMobile/releases');
}

function handleResize() {
  if (window.innerWidth < 1000) {
    showSmallScreen.value = true;
  } else {
    showSmallScreen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>