<template>
  <ButtonDark class="m-2" @click="openModal">Ajustes <IconSettings class="button-icon" /></ButtonDark>
  <Dialog :show="isOpen" @click-outside="closeModal">
    <template #title><b class="text-lg">Ajustes</b></template>
    <template #description>
      <div class="py-4 border-t">
        <p class="mb-3">Editar nombre:</p>
        <InputText class="h-10 w-full mb-4" v-model:value="name"></InputText>
        <ButtonDark @click="changeName">Cambiar nombre</ButtonDark>
      </div>
      <div class="py-4 border-t border-b">
        <p class="mb-3">Eliminar cuenta:</p>
        <RemoveAccount />
      </div>
    </template>
    <template #buttons>
      <ButtonDark @click="closeModal">Cerrar ventana</ButtonDark>
    </template>
  </Dialog>
  <Notification ref="notification" />
</template>

<script setup>
  import { IconSettings } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';
  const store = useUserStore();

  const api = useAppConfig().api;

  // Notification
  const notification = ref(null);

  // Modal window
  const isOpen = ref(false);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  // Change name
  const name = ref(store.user.name);

  const changeName = async () => {
    if (name.value != '') {
      await fetch(api + '/users/' + store.user.email, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: name.value,
          password: store.user.password,
          picture: store.user.picture,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            store.setName(name.value);
            notification.value.show('El nombre se ha cambiado con éxito.');
            closeModal();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          notification.value.show('Error al cambiar el nombre.');
        });
    } else {
      notification.value.show('No se permiten nombres vacíos.');
    }
  };
</script>
