import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore();

  if (!store.user && to.path != '/signin') {
    return navigateTo('/signin');
  } else if (store.user && to.path == '/signin') {
    // If the user has signed in, redirect to dashboard
    return navigateTo('/dashboard');
  } else if (store.user && store.user.room == null && (to.path == '/lobby' || to.path == '/play')) {
    // If the user is trying to access the lobby or the game screens, but hasn't joined a room
    // Redirect to dashboard
    return navigateTo('/dashboard');
  }
})
