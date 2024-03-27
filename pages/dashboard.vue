<template>
  <Head>
    <Title>WealthWars - Profile</Title>
    <Meta
      name="description"
      content="Un juego de estrategia donde tendrás que ganar dinero, erigir fábricas, y conquistar territorios para expandir tu influencia."
    />
  </Head>
  <section class="m-6">
    <!-- Settings part, non related with the user -->
    <Button class="m-4"><NuxtLink to="/play">Jugar</NuxtLink></Button>
    <ButtonRed class="w-36 m-4" @click="signout">Cerrar Sesión</ButtonRed>
  </section>
  <section class="m-6">
    <!-- section class="flex flex-col justify-center items-center" last -->
    <div class="rounded-xl border border-gray-800 p-6">
      <!-- User's profile settings -->
      <div class=" top-14 m-6 flex flex-col justify-center items-center"> 
        <img src='/profile.png' alt="User Picture" style="max-width: 200px; max-height: 200px;"/>
        <p class="m-6 text-xl text-g-800">{{ store.user.name }}</p>
      </div>
      <hr/>
      <!-- Achievements -->
      <div class="m-6">

      </div>
    </div> 
  </section>
  <hr/>
  <section class="flex flex-row m-6">
    <!-- Left side, match related-->
    <div class="flex flex-col justify-center items-center rounded-xl border border-gray-800 p-6 w-full">
      <!-- Start new match -->
      <div class="m-6">
        <NuxtLink to="/lobby"><Button>CREAR PARTIDA</Button></NuxtLink>
      </div>
        
      <hr/>
    
      <!-- Join match -->
      <div class="flex flex-row justify-center m-6 w-full max-w-md">
        <div class="flex flex-row w-full max-w-md">
          <InputText class="flex-grow text-center m-4" placeholder="Introduce código de invitación" />
          <Button class="m-4">UNIRSE</Button>
        </div>
      </div>
    </div>
    <!-- Right side, friends related-->
    <div>

    </div>
    
  </section>
  <footer></footer>
</template>

<script setup>
import { useUserStore } from "~/stores"

// Protect route against unlogged users
definePageMeta({
  middleware: [
    'auth',
  ],
});

const store = useUserStore()

const signout = () => {
  store.signout();
  navigateTo('/');
}

// This should also contain the URL to the user picture
const user = ref({
    name: 'Jorge'
  });
</script>