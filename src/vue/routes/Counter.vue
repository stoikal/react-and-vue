<template>
  <div class="px-6">
    <div>count: {{ count }}</div>
    <button @click="count--">decrement</button>
    <button @click="count++">increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0)
</script>