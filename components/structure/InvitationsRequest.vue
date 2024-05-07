<template>
  <Button class="m-4 justify-center items-center relative" @click="openModal">
    <IconMail />
    <div
      v-show="requestNumber > 0"
      class="absolute -top-2 -right-2 bg-yellow-700 px-2 py-1 rounded-full text-center text-sm flex flex-row items-center"
      style="width: 1.5rem; height: 1.5rem"
    >
      {{ requestNumber }}
    </div>
  </Button>
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

  const api = useAppConfig().api;

  const store = useUserStore();

  const emit = defineEmits(['Modified']);

  // Notification
  const notification = ref(null);

  // Modal window
  const isOpen = ref(false);

  // Has the user accepted any requests
  const hasBeenModified = ref(false);

  // If so set it to true.
  function handdleModification() {
    requestNumber.value = requestNumber.value - 1;
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

  // Get request number
  const response = await fetch(api + '/users/' + store.user.email + '/friendsRequests', {
    method: 'GET',
    credentials: 'include',
  });
  const friendRequests = await response.json();
  const requestNumber = ref(friendRequests.length);
</script>
