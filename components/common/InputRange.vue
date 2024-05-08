<template>
  <input
    type="range"
    @input="$emit('update:value', $event.target.value)"
    :value="value"
    :min="min"
    :max="max"
    class="range-input"
  />
</template>

<style>
  .range-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    cursor: pointer;
    outline: none;
    border-radius: 15px;
    height: 6px;
    background: #cbd5e1;
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    width: 15px;
    background-color: #64748b;
    border-radius: 50%;
    border: none;
    transition: 0.2s ease-in-out;
  }

  .range-input::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background-color: #64748b;
    border-radius: 50%;
    border: none;
    transition: 0.2s ease-in-out;
  }

  .range-input::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .range-input:active::-webkit-slider-thumb {
    box-shadow: 0 0 0 13px rgba(0, 0, 0, 0.2);
  }
  .range-input:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 13px rgba(0, 0, 0, 0.2);
  }

  .range-input::-moz-range-thumb:hover {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .range-input:active::-moz-range-thumb {
    box-shadow: 0 0 0 13px rgba(0, 0, 0, 0.2);
  }
  .range-input:focus::-moz-range-thumb {
    box-shadow: 0 0 0 13px rgba(0, 0, 0, 0.2);
  }
</style>

<script setup>
  defineProps(['value', 'placeholder', 'min', 'max']);
  defineEmits(['update:value']);
</script>
