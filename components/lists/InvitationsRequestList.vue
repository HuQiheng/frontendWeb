<template>
  <Notification ref="notification" />
  <div class="p-4">
    <div v-if="friendRequests.length === 0" class="text-center text-xl text-gray-400">
      No hay peticiones de amistad.
    </div>
    <div v-else class="overflow-y-auto overflow-x-hidden max-h-96 scrollbar">
      <div v-for="(player, index) in friendRequests" :key="index" class="flex flex-grow m-1">
        <div class="flex flex-grow bg-primary-light border border-primary shadow-md border rounded-lg p-4 m-1">
          <div class="flex items-center flex-grow">
            <div class="flex-shrink-0 mr-3">
              <img
                :src="player.picture"
                :alt="player.user"
                referrerPolicy="no-referrer"
                class="h-12 w-12 rounded-full"
              />
            </div>
            <div class="flex flex-grow">
              <!-- Changed to flex-col -->
              <div class="font-bold text-xl">{{ player.name }}</div>
            </div>
            <div class="flex justify-start">
              <!-- Changed to justify-start -->
              <Button class="mr-2" @click="acceptEvent(player.email)"><IconCheck /></Button>
              <!-- Adjusted margin -->
              <ButtonRed class="mr-2" @click="rejectEvent(player.email)"><IconX /></ButtonRed>
              <!-- Adjusted margin -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scrollbar::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #ea970a; /* Set the color of the scrollbar thumb */
    border-radius: 5px; /* Set the border radius of the scrollbar thumb */
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: #e5e7eb; /* Set the color of the scrollbar track */
    border-radius: 5px; /* Set the border radius of the scrollbar track */
  }
</style>

<script setup>
  import { IconCheck, IconX } from '@tabler/icons-vue';
  import { useUserStore } from '~/stores';

  const emit = defineEmits(['Modified']);

  const api = useAppConfig().api;

  const store = useUserStore();

  // Notification
  const notification = ref(null);

  // List of friend requests
  const friendRequests = ref([]);

  // Function that fetches the requests
  const fetchFriends = async () => {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friendsRequests', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error al consultar amigos.');
      }
      friendRequests.value = await response.json();
    } catch (error) {
      console.error('Error al consultar amigos:', error);
      friendRequests.value = [];
    }
  };

  // Fetches the friends when the pop-up is displayed.
  useFetch(fetchFriends);

  // Function that accepts the friend request and starts a friendship between the user an the other player
  async function acceptEvent(email) {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friends', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        notification.value.show('Error al aceptar solicitud de amistad.');
        throw new Error('Error al aceptar solicitud de amistad.');
      }
      notification.value.show('Solicitud aceptada.');
      fetchFriends();
      emit('Modified');
    } catch (error) {
      console.error('Error al aceptar solicitud de amistad.', error);
    }
  }

  // Function that rejects the friend request.
  async function rejectEvent(email) {
    try {
      const response = await fetch(api + '/users/' + store.user.email + '/friendRequests', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email }),
      });

      if (!response.ok) {
        notification.value.show('Error al rechazar solicitud de amistad.');
        throw new Error('Error al rechazar solicitud de amistad.');
      }

      notification.value.show('Solicitud rechazada.');
      fetchFriends();
    } catch (error) {
      console.error('Error al rechazar solicitud de amistad.', error);
    }
  }
</script>
