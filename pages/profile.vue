<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <section>
    <!-- Settings part, non related with the user -->
  </section>
  <section>
    <!-- User's profile settings -->
  </section>
  <hr />
  <section>
    <!-- Achievements -->
  </section>
  <hr />
  <section>
    <!-- Start new match -->
    <NuxtLink to="/lobby"><Button>CREAR PARTIDA</Button></NuxtLink>
  </section>
  <hr />
  <section class="flex justify-center items-center h-screen">
    <!-- Join match -->
    <InputText placeholder="Introduce código de invitación" />
    <Button>UNIRSE</Button>
  </section>
  <footer></footer>
</template>
