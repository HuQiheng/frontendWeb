<template>
  <Button class="m-4 justify-center items-center" @click="openModal"> <IconMail /> </Button>
  <DialogBig :show="isOpen" @click-outside="closeModal" style="width: 600px; height: 400px">
    <template #title><b class="flex text-2xl justify-center text-center"> Peticiones de amistad</b> </template>
    <template #description>
      <InvitationsRequestList />
    </template>
    <template #buttons>
      <ButtonDark @click="closeModal">Cerrar ventana</ButtonDark>
    </template>
  </DialogBig>
  <Notification ref="notification" />
</template>

<script setup>
  import { IconMail } from '@tabler/icons-vue';
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

  /*
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
    */
</script>
