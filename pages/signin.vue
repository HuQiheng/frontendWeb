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

  const api = useAppConfig().api;

  const store = useUserStore();

  // Sign in & navigate to dashboard if URL parameters indicate to do so
  const route = useRoute().query;
  if (Object.keys(route).length != 0) {
    if (route.user != null) {
      let user = JSON.parse(route.user);
      await fetch(api + '/users/' + user.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => user = data)
        .catch((error) => console.error('Error:', error));
      store.setUser({
        email: user.email,
        name: user.username.trimEnd(),
        password: user.password,
        picture: user.picture,
        room: null,
      });
      navigateTo('/dashboard');
    }
  }

  // Access backend
  const signin = async () => {
    navigateTo(api + '/auth/google', { external: true });
  };
</script>
