<template>
  <ButtonRed class="w-40 m-4" @click="openModal">Eliminar cuenta</ButtonRed>
  <Dialog :show="isOpen">
    <template #title>¿Estás seguro de que quieres eliminar tu cuenta?</template>
    <template #description>Esta acción no tiene vuelta atrás, perderás todo tu progreso.</template>
    <template #buttons>
      <ButtonRed @click="removeAccount" class="mr-4">Eliminar cuenta</ButtonRed>
      <ButtonDark @click="closeModal">Cancelar acción</ButtonDark>
    </template>
  </Dialog>
</template>

<script setup>
import { useUserStore } from '~/stores';
const store = useUserStore();

const api = useAppConfig().api;

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
}

const closeModal = () => {
  isOpen.value = false;
}

const removeAccount = async () => {
  await useFetch(api + '/users/' + store.user.email, {
    method: 'delete',
    onResponse({ request, response, options }) {
      console.log(response);
      closeModal();
    }
  });
}
</script>