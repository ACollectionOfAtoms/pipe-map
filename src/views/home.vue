<template>
  <div>
    heh
    <pipe-map><pipe-map>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'

export default {
  name: 'main-app',

  data() {
    return {
      hi: 'lol'
    }
  },

  components: {
    'pipe-map': PipeMap
  }
}
</script>

<style>

</style>
