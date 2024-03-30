import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore();

  if (!store.user) {
    return navigateTo('/signin');
  }
})
