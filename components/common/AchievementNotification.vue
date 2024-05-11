<template>
  <TransitionRoot appear :show="isShown" as="template">
    <Dialog as="div" class="relative z-30">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center" @click="isShown = false">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white text-center">
                ¡Nuevo logro desbloqueado!
              </DialogTitle>
              <div class="mt-2 flex flex-col items-center">
                <h3 class="mb-2">{{ title }}</h3>
                <div
                  class="p-3 mx-4 h-20 w-20 bg-white/25 flex justify-center items-center rounded-lg border border-primary">
                  <img class="max-h-full max-w-full" :src="image">
                </div>
                <p class="mt-2">{{ description }}</p>
              </div>
              <div class="flex flex-row mt-4 justify-center">
                <ButtonDark @click="isShown = false">Cerrar ventana</ButtonDark>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

  const title = ref('');
  const description = ref('');
  const image = ref('');

  const isShown = ref(false);

  // Shows achievement notification
  function show(t, d, i) {
    title.value = t;
    description.value = d;
    image.value = i;
    isShown.value = true;
  }

  defineExpose({
    show,
  });
</script>