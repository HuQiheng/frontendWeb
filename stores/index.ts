import { defineStore } from 'pinia'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  interface UserData {
    email: string;
    name: string;
    picture: string;
    room: string;
  }

  const user = useCookie<UserData>('userData', { maxAge: 60*60 });

  const setUser = (data?: any) => (user.value = data);

  const setRoom = (data?: any) => (user.value.room = data);

  const unsetRoom = () => (user.value.room = '');

  const signout = () => {
    setUser();
    navigateTo('/');
  }

  return { 
    user,
    setUser,
    setRoom,
    unsetRoom,
    signout 
  }
})
