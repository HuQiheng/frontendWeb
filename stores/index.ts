import { defineStore } from 'pinia'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  //const token = useCookie('userToken', { maxAge: 60*60 })

  interface UserData {
    email: string;
    name: string;
    token: string;
  }

  // const user = useCookie('userData', { maxAge: 60*60 })
  const user = useCookie<UserData>('userData', { maxAge: 60*60 });

  //const setToken = (data?: string) => (token.value = data)
  const setUser = (data?: any) => (user.value = data);

  const signout = () => {
    //setToken()
    setUser();
    navigateTo('/');
  }

  return { 
    user,
    setUser,
    //token,
    //setToken,
    signout 
  }
})
