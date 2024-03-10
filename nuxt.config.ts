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
    clientId: '528032898405-i2majo762n534rs0n10u6t16gid8ltds.apps.googleusercontent.com',
  }
});
