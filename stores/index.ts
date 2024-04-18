import { defineStore } from 'pinia'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  interface UserData {
    email: string;
    name: string;
    password: string;
    picture: string;
    room: string;
  }

  const user = useCookie<UserData>('userData', { maxAge: 60*60 });

  const connectedPlayers = useCookie('playersData', { maxAge: 60*60 });
  const gameState = ref(null);

  // Methods
  const setUser = (data?: any) => (user.value = data);

  const setName = (data?: any) => (user.value.name = data);

  const setRoom = (data?: any) => (user.value.room = data);

  function getRoom() {
    return user.value.room;
  }
  
  const signout = () => {
    setUser();
    navigateTo('/');
  }

  

  return { 
    user,
    connectedPlayers,
    gameState,
    setUser,
    setName,
    setRoom,
    getRoom,
    signout 
  }
});
