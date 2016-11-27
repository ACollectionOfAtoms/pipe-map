<template>
<!-- THIS COMPONENT provides
    a full-screen container
    for 'Card' components -->
  <div class='slide-container'>
      <intro-card v-if='isIntro'></intro-card>
      <year-card v-if='isYear'
            :card-id='cardId'
            :year='year'
            :accidents='accidents'>
      </year-card>
      <outro-card v-if='isOutro'></outro-card>
  </div>
</template>

<script>
import YearCard from 'components/YearCard.vue'
import IntroCard from 'components/IntroCard.vue'
import OutroCard from 'components/OutroCard.vue'

export default {
  props: {
    year: null,
    accidents: 0,
    id: '',
    isIntro: false,
    isOutro: false,
    isYear: false,
    isInfo: false
  },

  data() {
    return {
    }
  },

  components: {
    'year-card': YearCard,
    'intro-card': IntroCard,
    'outro-card': OutroCard
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
  .slide-container {
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    position: relative;
  }
</style>
