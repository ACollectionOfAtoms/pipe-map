<template>
  <div id='presentation-container'>
    <slide v-for='(year, index) in years'
           :id='index'
           :ref='index'
           :year='year'
    ></slide>
  </div>
</template>

<script>
import Slide from 'components/Slide.vue'
import filter from 'lodash.filter'
import utils from 'utils'
import moment from 'moment'

export default {
  props: {
      siteData: {}
  },

  data() {
    return {
      years: Array.from(new Array(16), (x, i) => 2000 + i + 1),
      currentYear: ''
    }
  },

  components: {
    'slide': Slide
  },

  mounted() {
    $('#presentation-container').on("scroll.scroller", () => {
      // Feels very ineffecient, optimize/refactor if required
      for (let year of this.years) {
        let cardId = '#' + year + '-card'
        let el = $(cardId)
        if(utils.isElementInViewport(el)) {
          this.currentYear = el.text()
          this.currentYear = moment(this.currentYear, 'YYYY').unix()
          this.onSlide(this.currentYear)
        }
      }
    })
  },

  methods: {
    onSlide(dateVal) {
      let newData = filter(this.siteData, d => {
        return d.date <= dateVal
      })
      window.eventBus.$emit('updateSites', newData)
    }
  }
}
</script>

<style scoped>
  #presentation-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    overflow-y: scroll;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>
