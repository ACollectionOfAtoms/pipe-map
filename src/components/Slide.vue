<template>
  <div class='slide-container'>
    <div class='row' :class="{ 'year-card-row bottom-xs': year}">
      <card :card-id='cardId'
            :card-type='cardType'
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
    year: null,
    accidents: 0,
    id: '',
    cardType: ''
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
      if (!this.year) {
        return this.id
      }
      return this.year + '-card'
    }
  }
}
</script>

<style scoped>
  .year-card-row {
    margin: 0em 1em 0 1em;
    height: 100%;
  }
  .slide-container {
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    position: relative;
  }
</style>
