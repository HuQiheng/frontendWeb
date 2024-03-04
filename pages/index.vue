<template>
  <div class="flex flex-col justify-center items-center h-screen background mb-16">
    <h1 class="text-8xl font-bold text-center mb-4">WealthWars</h1>
    <h2 class="text-lg text-center mb-8">Description</h2>
    <Button>Jugar</Button>
  </div>
  <CardContainer />
  <!-- FOOTER -->
  <Footer></Footer>
</template>

<style scoped>
  .background {
    background-image: url('/epic_background.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
