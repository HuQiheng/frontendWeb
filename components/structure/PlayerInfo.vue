<template>
  <PlayerCard :player="player" @click="openModal" class="cursor-pointer hover:bg-gray-100" />
  <DialogBig :show="isOpen" @click-outside="closeModal" style="width: 600px; height: 400px">
    <template #description>
      <section class="flex-1 flex-col justify-center items-center">
        <div v-if="player.email != store.user.email" class="flex flex-1">
          <div class="flex flex-grow"></div>
          <!-- Needs logic to render -->
          <div v-if="areFriends">
            <ButtonRed @click="deleteFriend"><IconHeartBroken /></ButtonRed>
          </div>
          <div v-else>
            <Button @click="sendFriendRequest"><IconHeartPlus /></Button>
          </div>
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

  const openModal = async () => {
    isOpen.value = true;
    await fetchFriendship();
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  // Check if the user and the other player are already friends
  const areFriends = ref('');

  // Function that checks friendship between the user and the other player
  const fetchFriendship = async () => {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/' + props.player.email + '/friendship', {
        method: 'GET',
        credentials: 'include',
      });
      // If something goes wrong throw an error
      if (!response.ok) {
        areFriends = false;
        throw new Error('Failed to fetch friends');
      }
      // Are they friends;
      areFriends.value = await response.json();
    } catch (error) {
      console.error('Error fetching friends:', error);
      areFriends.value = false;
    }
  };

  // Function that send the other player a friend request
  async function sendFriendRequest() {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friendRequests', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: props.player.email }),
      });

      if (!response.ok) {
        notification.value.show('Error mandando solicitud de amistad.');
        throw new Error('Error sending friend request');
      }

      notification.value.show('Invitación enviada.');
      console.log(addFriendMail.value);
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  }

  // Function that ends the friendship between the user and the other player
  async function deleteFriend() {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friends', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: props.player.email }),
      });

      if (!response.ok) {
        notification.value.show('Error mandando solicitud de amistad.');
        throw new Error('Error sending friend request');
      }

      notification.value.show('Amigo eliminado');
      window.location.reload();
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  }
</script>
