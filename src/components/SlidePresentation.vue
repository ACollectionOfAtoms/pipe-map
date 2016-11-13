<template>
  <div>
    <div id='presentation-container'>
      <pipe-map :site-data='siteData'></pipe-map>
      <!-- start intro slide -->
      <slide>
        <h4 slot='header'> Pipeline Accidents In The 21st Century </h4>
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
      <!-- start outro slide -->
      <slide>
        <h4 slot='header'> In Total </h4>
        <p slot='body'> There have been about {{ totalAccidents }} pipeline accidents.* </p>
      </slide>
    </div>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'
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
    'slide': Slide,
    'pipe-map': PipeMap
  },

  mounted() {
    let presContainer = $('#presentation-container')
    presContainer.on("scroll.scroller", () => {
      // Feels very ineffecient, optimize/refactor if required
      for (let year of Object.keys(this.years)) {
        let cardId = '#' + year + '-card'
        let el = $(cardId)

        if(utils.isElementInViewport(el)) {
          console.log(el.text())
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
      window.eventBus.$emit('updateSites', currentYearData)
    }
  }
}
</script>

<style scoped>
  #presentation-container {
    position: absolute;
    background: transparent;
    width: 100vw;
    height: 100%;
    padding-top: 1em;
    max-height: 100%;
    overflow-y: scroll;
    top: 0;
    left: 0;
  }
  .subdued-text {
    font-size: 0.6em;
    color: #aaaaaa;
  }
</style>
