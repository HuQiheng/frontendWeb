<template>
  <IconVolume v-show="isVolumeOn" class="w-10 h-10 cursor-pointer" @click="turnOffAudio" />
  <IconVolumeOff v-show="!isVolumeOn" class="w-10 h-10 cursor-pointer" @click="turnOnAudio"/>
</template>

<script setup>
import { IconVolume, IconVolumeOff } from '@tabler/icons-vue';
const props = defineProps(['audio']);

const audio = new Audio(props.audio);
audio.loop = true;
audio.volume = 0.1;
const isVolumeOn = ref(true);

function turnOnAudio() {
  audio.play();
  isVolumeOn.value = true;
}

function turnOffAudio() {
  audio.pause();
  isVolumeOn.value = false;
}

onMounted(() => {
  turnOnAudio();
});

onBeforeUnmount(() => {
  turnOffAudio();
});
</script>