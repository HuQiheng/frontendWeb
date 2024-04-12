<template>
Cerrando sesión
</template>

<script setup>
const store = useUserStore();
store.signout();
navigateTo('/');
</script>