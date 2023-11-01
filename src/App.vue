<template>
  <header>
    <div class="container">
    <h1>Booking</h1>
    </div>
  </header>

  <RouterView />
</template>

  <script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import {ref} from 'vue'
  import Menubar from 'primevue/menubar';

  const items = ref([
    {
        label: 'Home'
    }
]);
  </script>
