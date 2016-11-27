<template>
  <div class='about-page-container'>
    <app-header></app-header>
  </div>
</template>

<script>
import Header from 'components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style>
.about-container {
  padding-top: 5%;
}
</style>
