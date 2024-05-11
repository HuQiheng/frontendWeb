<template>
  <PlayerCard :player="player" @click="openModal" class="cursor-pointer" />
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
            <div v-if="invitationExists">
              <ButtonRed @click="deleteInvitation"><IconMailCancel class="mr-2" />Cancelar solicitud</ButtonRed>
            </div>
            <div v-else>
              <Button @click="sendFriendRequest"><IconHeartPlus /></Button>
            </div>
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
          <p class="mb-3 text-lg text-g-800">Victorias: {{ victories }} 🏆</p>
        </div>
        <hr />
        <!-- Achievements -->
        <div class="m-6">
          <AchievementList :email="props.player.email" />
        </div>
      </section>
    </template>
    <template #buttons>
      <ButtonDark @click="closeModal">Cerrar ventana</ButtonDark>
    </template>
  </DialogBig>
  <Notification ref="notification" />
</template>

<script setup>
  import { IconHeartPlus, IconHeartBroken, IconMailCancel } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';

  // Player info
  const props = defineProps({
    player: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(['friendDeleted']);

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

  // Victories
  const victories = ref(0);
  useFetch(api + '/users/' + props.player.email + '/wins', {
    method: 'GET',
    credentials: 'include',
    onResponse({ response }) {
      victories.value = response._data;
    },
  });

  // Check if there is an invitation
  async function checkInvitation() {
    try {
      const response = await fetch(
        api + '/users/' + store.user.email + '/' + props.player.email + '/friendRequest/existence',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const answer = await response.json();

      return answer.hasFriendReq;
    } catch (error) {
      console.error('Error sending friend request', error);
      notification.value.show('Ha ocurrido un error!');
    }
  }

  // Function that deletes the frined request
  async function deleteInvitation() {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friendRequests', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: props.player.email }),
      });

      if (!response.ok) {
        notification.value.show('Error al borrar solicitud.');
        throw new Error('Error deleting friend request.');
      }

      invitationExists.value = false;

      notification.value.show('Solicitud eliminada.');
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  }

  // Check if the user and the other player are already friends
  const areFriends = ref(false);

  // Check if the user and the other player are already friends
  const invitationExists = ref(false);

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
      const jsonResponse = await response.json();
      areFriends.value = jsonResponse.areFriends;
      //console.log(jsonResponse);

      if (!areFriends.value) {
        // Check if there is a invitation pending
        const invitationPending = await checkInvitation();

        invitationExists.value = invitationPending;

        console.log('Invitación existe: ', invitationExists);
      }
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

      invitationExists.value = true;

      notification.value.show('Invitación enviada.');
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
      areFriends.value = false;
      notification.value.show('Amigo eliminado');
      emit('friendDeleted');
      closeModal();
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  }
</script>
