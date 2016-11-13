<template>
  <div id='presentation-container'>
    <!-- start intro slide -->
    <slide>
      <h4 slot='header'> Pipeline Accidents - 2000 And Beyond </h4>
      <p slot='body'> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
      <span slot='footer' class='subdued-text'>
        <p>SCROLL DOWN TO BEGIN ⬇</p>
      </span>
    </slide>
    <!-- end intro slide -->
    <slide v-for='(obj, year, index) in years'
           :id='index'
           :ref='index'
           :year='year'
           :accidents="obj.accidents"
    ></slide>
  </div>
</template>

<script>
import Slide from 'components/Slide.vue'
import filter from 'lodash.filter'
import utils from 'utils'
import Vue from 'vue'

export default {
  props: {
      siteData: {}
  },

  data() {
    let dateRange = Array.from(new Array(17), (x, i) => 2000 + i)

    return {
      currentYear: '',
      years: dateRange.reduce((obj, x) => Object.assign(obj, { [x]: {} }), {}), // like python dict comprehension
      totalAccidents: 0
    }
  },

  components: {
    'slide': Slide
  },

  mounted() {
    $('#presentation-container').on("scroll.scroller", () => {
      // Feels very ineffecient, optimize/refactor if required
      for (let year of Object.keys(this.years)) {
        let cardId = '#' + year + '-card'
        let el = $(cardId)

        if(utils.isElementInViewport(el)) {
          this.currentYear = year
          let currentDateYear = new Date(this.currentYear)
          this.filterSites(currentDateYear)
        }
      }
    })
  },

  methods: {
    filterSites(dateVal) {
      let currentYear = (dateVal.getFullYear() + 1).toString()
      let newData = filter(this.siteData, d => {
        return d.date.getFullYear() <= currentYear
      })
      let currentYearData = filter(newData, d => {
        return currentYear == d.date.getFullYear()
      })
      this.totalAccidents = newData.length
      Vue.set(this.years[currentYear], 'accidents', currentYearData.length)
      window.eventBus.$emit('updateSites', newData)
    }
  }
}
</script>

<style scoped>
  #presentation-container {
    position: absolute;
    width: 100vw;
    height: 100%;
    padding-top: 1em;
    max-height: 100vh;
    overflow-y: scroll;
    top: 0;
    left: 0;
  }
  .subdued-text {
    font-size: 0.6em;
    color: #aaaaaa;
  }
</style>
