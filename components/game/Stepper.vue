<template>
  <div 
    class="w-full p-5 flex flex-col items-start border border-gray-200 shadow-sm"
    style="border-radius: 2rem;"
  >
    <ol class="stepper">
      <li class="step" :class="{'text-black' : step > 0}">
        <span :class="[step > 0 ? 'border-black' : 'border-gray-500' ]">1</span>
        Cobrar
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="step" :class="{'text-black' : step > 1}">
        <span :class="[step > 1 ? 'border-black' : 'border-gray-500' ]">2</span>
        Invertir
        <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li class="step" :class="{'text-black' : step > 2}">
        <span :class="[step > 2 ? 'border-black' : 'border-gray-500' ]">3</span>
        Atacar
      </li>
    </ol>
    <div class="actions" v-show="step > 0">
      <ButtonDark 
        v-show="step == 1"
        @click="$emit('trigger', 'get-paid')"
      >Cobrar e ir al siguiente paso</ButtonDark>
      <ButtonDark 
        v-show="step == 2"
        @click="$emit('trigger', 'add-factories')"
      >Añadir fábricas</ButtonDark>
      <ButtonDark 
        v-show="step == 2"
        @click="$emit('trigger', 'add-troops')"
      >Añadir tropas</ButtonDark>
      <ButtonDark 
        v-show="step == 2"
        @click="$emit('trigger', 'move-troops')"
      >Mover tropas</ButtonDark>
      <ButtonDark 
        v-show="step == 2"
        @click="$emit('trigger', 'go-to-step-3')"
      >Ir al siguiente paso</ButtonDark>
      <ButtonDark 
        v-show="step == 3"
        @click="$emit('trigger', 'attack')"
      >Atacar</ButtonDark>
      <ButtonDark 
        v-show="step == 3"
        @click="$emit('trigger', 'end-turn')"
      >Finalizar turno</ButtonDark>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  @apply flex items-center space-x-2 text-sm font-medium text-center text-gray-500 bg-white sm:space-x-4 rtl:space-x-reverse;
}

.stepper .step {
  @apply flex items-center;
}

.stepper .step span {
  @apply flex items-center justify-center w-6 h-6 me-2 text-xs border-2 rounded-full shrink-0;
}

.actions {
  @apply flex flex-row pt-4;
}

.actions button {
  @apply mr-4;
}
</style>

<script setup>
defineProps(['step']);
</script>