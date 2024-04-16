<template>
  <Head>
    <Title>WealthWars</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <div class="flex flex-col justify-center items-center h-screen w-full background mb-16">
    <h1 class="lg:text-8xl text-4xl font-bold text-center mb-4">WealthWars</h1>
    <h2 class="max-w-2xl text-sm lg:text-lg text-center mb-8 p-4">
      Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu
      influencia.
    </h2>
    <NuxtLink to="/signin"><Button>JUGAR</Button></NuxtLink>
  </div>
  <!-- Images -->
  <CardContainer class="flex flex-col xl:flex-row justify-center items-center" />
  <div class="flex-grow w-full">
    <h1 class="text-4xl font-bold mt-4 text-center">Preguntas frecuentes</h1>

    <Faq />
  </div>

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
