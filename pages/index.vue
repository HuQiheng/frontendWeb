<template>
  <Head>
    <Title>WealthWars</Title>
    <Meta name="description" content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia." />
  </Head>
  <div class="flex flex-col justify-center items-center h-screen w-full background mb-16">
    <h1 class="text-8xl font-bold text-center mb-4">WealthWars</h1>
    <h2 class="max-w-2xl text-lg text-center mb-8">
      Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia.
    </h2>
    <NuxtLink to="/signin"><Button>JUGAR</Button></NuxtLink>
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
    height: 100vh;
    width: 100%;
  }
</style>
