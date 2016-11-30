<template>
<!-- THIS COMPONENT provides
    a full-screen container
    for 'Card' components -->
  <div class='slide-container'>
      <intro-card v-if='isIntro' :card-id='cardId'></intro-card>
      <info-card v-if='isInfo'
            :location='location'
            :description='description'
            :card-id='cardId'>
      </info-card>
      <year-card v-if='isYear'
            :card-id='cardId'
            :year='year'
            :accidents='accidents'>
      </year-card>
      <outro-card v-if='isOutro' :card-id='cardId'></outro-card>
  </div>
</template>

<script>
import YearCard from 'components/YearCard.vue'
import InfoCard from 'components/InfoCard.vue'
import IntroCard from 'components/IntroCard.vue'
import OutroCard from 'components/OutroCard.vue'

export default {
  props: {
    year: null,
    accidents: 0,
    id: '',
    location: '',
    description: '',
    isIntro: false,
    isOutro: false,
    isYear: false,
    isInfo: false
  },

  components: {
    'year-card': YearCard,
    'intro-card': IntroCard,
    'outro-card': OutroCard,
    'info-card': InfoCard
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
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: relative;
  }
</style>
