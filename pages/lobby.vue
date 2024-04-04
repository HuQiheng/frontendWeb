<template>
  <section class="flex m-6 justify-center">
    <h1 class="text-2xl font-bold m-4">Sala de espera</h1>
  </section>
  <section>
    <PlayerList :players="players" />
  </section>
  <section>
    <Button class="m-4"><NuxtLink to="/play">Empezar partida</NuxtLink></Button>
  </section>
</template>

<script setup>
  const players = ref([
    { name: 'Eindres', email: '', avatar: '/profile.svg' },
    { name: 'DiChorg', email: '', avatar: '/profile.svg' },
    { name: 'Eindres', email: '', avatar: '/profile.svg' },
    { name: 'DiChorg', email: '', avatar: '/profile.svg' },
    { name: 'Eindres', email: '', avatar: '/profile.svg' },
    { name: 'DiChorg', email: '', avatar: '/profile.svg' },
  ]);
</script>
