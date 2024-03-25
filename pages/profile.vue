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
  <section class=" relative flex flex-col justify-center items-center h-screen w-full">
    <!-- User's profile settings -->
    <div class="absolute top-14 mt-4 mb-4 flex flex-col justify-center items-center"> 
      <img src='/profile.png' alt="User Picture" style="max-width: 200px; max-height: 200px;"/>
      <p class="text-lg text-g-800">{{ user.name }}</p>
    </div>
    <hr/>
    <!-- Achievements -->
    <div class="mt-4 mb-4">

    </div>
    <hr/>
  
    <!-- Start new match -->
    <div class="mt-4 mb-4">
      <NuxtLink to="/lobby"><Button>CREAR PARTIDA</Button></NuxtLink>
    </div>
      
    <hr/>
  
    <!-- Join match -->
    <div class="flex flex-row justify-center mt-4 mb-4 w-full max-w-md">
      <div class="flex flex-row w-full max-w-md">
        <InputText class="flex-grow text-center mr-4" placeholder="Introduce código de invitación" />
        <Button class="ml-4">UNIRSE</Button>
      </div>
    </div>
  </section>
  <footer></footer>
</template>

<script setup>

  // This should also contain the URL to the user picture
  const user = ref({
    name: 'Jorge'
  });
</script>
