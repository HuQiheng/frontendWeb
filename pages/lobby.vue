<template>
  <section class="flex m-6 justify-center"> 
     <h1 class="text-2xl font-bold m-4">Sala de espera</h1> 
  </section>
  <section>
    <PlayerList :players="players"/>
  </section>
</template>

<script setup>
  const players = [
    { name: 'Eindres', email: '', avatar: '' },
    { name: 'DiChorg', email: '', avatar: '' },
  ];
</script>
