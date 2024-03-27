<template>
  <Head>
    <Title>Iniciar sesión | WealthWars</Title>
    <Meta name="description" content="Inicio de sesión para jugar WealthWars." />
  </Head>
  <Header></Header>
  <Main>
    <h1 class="my-4 text-2xl">Iniciar sesión</h1>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
  </Main>
  <Footer></Footer>
</template>

<script setup lang="ts">
  import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';
  import { useUserStore } from '~/stores';

  const store = useUserStore();

  // Handle success event
  const handleLoginSuccess = async (response: CredentialResponse) => {
    const { credential: authToken } = response;

    // Validate with backend
    console.log('Access Token', authToken);

    // Sign in & navigate to dashboard
    store.setUser({
      email: 'jorge@gmail.com',
      name: 'Jorge',
      token: 'jsfksfsdjkfdsjf',
    });
    await navigateTo('/play');
  };

  // Handle an error event
  const handleLoginError = () => {
    console.error('Login failed');
  };
</script>
