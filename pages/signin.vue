<template>
  <Head>
    <Title>Iniciar sesión | WealthWars</Title>
    <Meta name="description" content="Inicio de sesión para jugar WealthWars." />
  </Head>
  <Header></Header>
  <Main>
    <h1 class="my-8 text-2xl">Iniciar sesión</h1>
    <ButtonGoogle @click="signin" />
  </Main>
  <Footer></Footer>
</template>

<script setup>
  import { useUserStore } from '~/stores';

  const store = useUserStore();

  // Sign in & navigate to dashboard if URL parameters indicate to do so
  const route = useRoute().query;
  if (Object.keys(route).length != 0) {
    if (route.user != null) {
      const user = JSON.parse(route.user);
      store.setUser({
        email: user.email,
        name: user.name,
        picture: 'jsfksfsdjkfdsjf',
      });
      navigateTo('/dashboard');
    }
  }

  // Access backend
  const api = useAppConfig().api

  const signin = async () => {
    navigateTo(api + '/auth/google', { external: true });
  }
</script>
