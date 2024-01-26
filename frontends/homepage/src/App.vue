<template>
  <div class="app">
    <HomeHeader />
    <RouterView />
    <SnackbarPop />
  </div>
</template>

<style scoped></style>

<script setup>
import HomeHeader from '../src/components/HomeHeader.vue';
import SnackbarPop from './pops/SnackbarPop.vue';
</script>