<template>
  <div class="flex flex-row justify-center">
    <div
      v-for="achievement in achievements"
      class="p-3 mx-4 h-20 w-20 bg-white/25 flex justify-center items-center rounded-lg border border-primary"
    >
      <img class="max-h-full max-w-full" :src="achievement.image_url" :alt="achievement.title" />
    </div>
  </div>
  <!--{{ achievements }}-->
</template>

<script setup>
  const props = defineProps(['email']);

  const api = useAppConfig().api;

  const achievements = ref(null);
  useFetch(api + '/users/' + props.email + '/achievements', {
    method: 'GET',
    credentials: 'include',
    onResponse({ response }) {
      achievements.value = response._data;
    },
  });
</script>
