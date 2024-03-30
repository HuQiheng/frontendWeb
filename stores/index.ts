import { defineStore } from 'pinia'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  interface UserData {
    email: string;
    name: string;
    picture: string;
  }

  const user = useCookie<UserData>('userData', { maxAge: 60*60 });

  const setUser = (data?: any) => (user.value = data);

  const signout = () => {
    setUser();
    navigateTo('/');
  }

  return { 
    user,
    setUser,
    signout 
  }
})
