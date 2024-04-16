<template>
    <div class="w-full px-4 pt-16">
      <div class="mx-auto w-full rounded-2xl bg-white p-2">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-amber-400 px-4 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500/75"
          >
            <span>What is your refund policy?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-amber-900"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pb-2 pt-4">
            If you're unhappy with your purchase for any reason, email us within
            90 days and we'll refund you in full, no questions asked.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" class="mt-2" v-slot="{ open }">
          <DisclosureButton
            class="flex w-full justify-between rounded-lg bg-amber-400 px-4 py-2 text-left text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500/75"
          >
            <span>Do you offer technical support?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-amber-900"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pb-2 pt-4">
            No.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronUpIcon } from '@heroicons/vue/20/solid'
  </script>
  