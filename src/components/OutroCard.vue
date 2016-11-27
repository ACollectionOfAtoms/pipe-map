<template>
  <!-- The outro card should include some photos along with tabulature data with
      averages and other interesting data -->
  <div class='outro-container'>
    <div :id='cardId' class='outro-content'>
      <h1> In Conclusion </h1>
    </div>
  </div>
</template>

<script>
import IntroHeader from 'components/IntroHeader.vue'

export default {
  props: {
    cardId: ''
  }
}
</script>

<style scoped>
.outro-container {
  text-align: center;
  height: 100%;
  width: 100%;
  background-color:white;
}
</style>
