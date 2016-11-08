<template>
  <div class='container'>
    <pipe-map></pipe-map>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'
import Slider from 'components/Slider.vue'

export default {
  name: 'main-app',

  components: {
    'pipe-map': PipeMap,
    'slider': Slider
  }
}
</script>

<style>
</style>
