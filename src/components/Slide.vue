<template>
  <div class='slide-container'>
    <div class='row'>
      <card :card-id='cardId'
            :year='year'
            :accidents='accidents'>
        <span slot="header"><slot name="header"></slot></span>
        <span slot="body"><slot name="body"></slot></span>
        <span slot="footer"><slot name="footer"></slot></span>
      </card>
    </div>
  </div>
</template>

<script>
import Card from 'components/DescriptionCard.vue'

export default {
  props: {
    year: '',
    accidents: 0
  },

  data() {
    return {
      stuff: 'Stuff',
      isEmpty: false,
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
    pointer-events: none;
    position: relative;
  }
</style>
