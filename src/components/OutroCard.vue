<template>
  <div class='intro-container'>
    <h1> An Outrocard </h1>
  </div>
</template>

<script>
import IntroHeader from 'components/IntroHeader.vue'

export default {
  components: {
    'intro-header': IntroHeader
  }
}
</script>

<style>
.intro-container {
  text-align: center;
  height: 100%;
  width: 100%;
  background-color:white;
}
</style>
