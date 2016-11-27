<template>
  <div class='slide-container'>
    <div class='slide-content' :class="{ 'year-card-row middle-xs': year}">
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
    year: null,
    accidents: 0,
    id: '',
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
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    position: relative;
  }
  .slide-content {
    width: 100%;
    height: 100%;
  }
</style>
