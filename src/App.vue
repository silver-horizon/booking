<template>
  <header>
    <div class="container">
    <h1>Booking</h1>
    </div>
  </header>

  <RouterView />

  <Toast position="bottom-right" group="br" />
</template>

  <script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Toast from 'primevue/toast';
  </script>
