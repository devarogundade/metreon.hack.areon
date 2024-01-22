<template>
  <div class="app">
    <ScanHeader />
    <div class="scroll_y">
      <RouterView />
    </div>
    <SnackbarPop />
  </div>
</template>

<style scoped>
.app {
  background-image: url('/images/bg.png');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 1350px;
  background-attachment: fixed;
  height: 100%;
  width: 100vw;
}

.scroll_y {
  overflow-y: auto;
}
</style>

<script setup>
import ScanHeader from '../src/components/ScanHeader.vue';
import SnackbarPop from './pops/SnackbarPop.vue';
</script>
