<template>
  <Button class="m-4 justify-center items-center" @click="openModal"> <IconMail /> </Button>
  <DialogBig :show="isOpen" @click-outside="closeModal" style="width: 600px; height: 400px">
    <template #title><b class="flex text-2xl justify-center text-center"> Peticiones de amistad</b> </template>
    <template #description>
      <InvitationsRequestList @Modified="handdleModification" />
    </template>
    <template #buttons>
      <ButtonDark @click="closeModal">Cerrar ventana</ButtonDark>
    </template>
  </DialogBig>
  <Notification ref="notification" />
</template>

<script setup>
  import { IconMail } from '@tabler/icons-vue';

  const emit = defineEmits(['Modified']);

  // Notification
  const notification = ref(null);

  // Modal window
  const isOpen = ref(false);

  // Has the user accepted any requests
  const hasBeenModified = ref(false);

  // If so set it to true.
  function handdleModification() {
    hasBeenModified.value = true;
  }

  // Window control.
  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    // If the user has accepted a request reload the page
    if (hasBeenModified.value) {
      emit('Modified');
    }
  };
</script>
