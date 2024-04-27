<template>
  <PlayerCard :player="player" @click="openModal" class="cursor-pointer hover:bg-gray-100" />
  <DialogBig :show="isOpen" @click-outside="closeModal" style="width: 600px; height: 400px">
    <template #description>
      <section class="flex-1 flex-col justify-center items-center">
        <div v-if="player.email != store.user.email" class="flex flex-1">
          <div class="flex flex-grow"></div>
          <!-- Needs logic to render -->
          <Button><IconHeartPlus /></Button>
          <ButtonRed><IconHeartBroken /></ButtonRed>
        </div>

        <!-- User's profile settings -->
        <div class="top-14 flex flex-col justify-center items-center">
          <img
            v-if="player.picture"
            :src="player.picture"
            referrerPolicy="no-referrer"
            alt="User Picture"
            class="rounded-full"
            style="width: 180px; height: 180px"
          />
          <img v-else src="/profile.svg" alt="User Picture" style="width: 180px; height: 180px" />
          <p class="m-6 text-xl text-g-800">{{ player.name }}</p>
          <!-- This is not completed yet-->
          <p class="mb-3 text-lg text-g-800">Victorias: 0 🏆</p>
        </div>
        <hr />
        <!-- Achievements -->
        <div class="m-6"></div>
      </section>
    </template>
    <template #buttons>
      <ButtonDark @click="closeModal">Cerrar ventana</ButtonDark>
    </template>
  </DialogBig>
  <Notification ref="notification" />
</template>

<script setup>
  import { IconHeartPlus, IconHeartBroken } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';

  // Player info
  const props = defineProps({
    player: {
      type: Object,
      required: true,
    },
  });
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
</script>
