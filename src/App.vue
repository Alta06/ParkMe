<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="ParkMe!" />
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>


</style>
