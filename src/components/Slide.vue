<template>
  <div class='slide-container'>
    <card :card-id='cardId' :year='year'></card>
  </div>
</template>

<script>
import Card from 'components/DescriptionCard.vue'

export default {
  props: {
    year: '',
  },

  data() {
    return {
      stuff: 'Stuff',
      isEmpty: false
    }
  },

  components: {
    'card': Card
  },

  computed: {
    cardId() {
      return this.year + '-card'
    }
  }
}
</script>

<style scoped>
  .slide-container {
    width: 100vw;
    height: 100vh;
    margin: 0 30%;
    position: relative;
    z-index: 10;
  }
</style>
