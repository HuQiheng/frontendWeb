// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-vue3-google-signin'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
  googleSignIn: {
    clientId: '235834578087-irqfjimd01qqgc0dav9i60ojv5q4f8q8.apps.googleusercontent.com',
  }
});
