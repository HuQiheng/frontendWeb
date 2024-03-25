<template>
  <NuxtLink to="/play">Jugar</NuxtLink><br>
  <button @click="signout">Cerrar sesión</button>
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
</script>