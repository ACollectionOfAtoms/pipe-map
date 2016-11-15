<template>
  <div>
    <div id='presentation-container'>
      <pipe-map :site-data='siteData'></pipe-map>
      <!-- start intro slide -->
      <slide :id='introId'>
        <h1 slot='header'> Pipeline Accidents Of The 21st Century </h1>
        <p slot='body'> Clicking on disaster sites provides more information. </p>
        <span slot='footer' class='subdued-text'>
          <h3>SCROLL DOWN TO BEGIN ⬇</h3>
        </span>
      </slide>
      <!-- end intro slide -->

      <!-- start years slides -->
      <slide v-for='(obj, year, index) in years'
             :ref='index'
             :year='year'
             :accidents="obj.accidents"
      ></slide>
      <!-- end year slides -->

      <!-- start outro slide -->
      <slide :id='outroId'>
        <h4 slot='header'> In the last 16 years </h4>
        <p slot='body'> There have been about {{ totalAccidents }} pipeline accidents.* </p>
      </slide>
      <!-- end outro slide -->
    </div>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'
import Slide from 'components/Slide.vue'
import filter from 'lodash.filter'
import round from 'lodash.round'
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
      totalAccidents: 0,
      introId: 'intro-card',
      outroId: 'outro-card'
    }
  },

  components: {
    'slide': Slide,
    'pipe-map': PipeMap
  },

  mounted() {
    let presContainer = $(window)
    let introRect = document.getElementById("outro-card").getBoundingClientRect().top
    presContainer.on('scroll.scroller', () => {
      console.log('sup')
      let presTop = presContainer.scrollTop()
      if (presTop === 0) {
        // We're at the top, remove all sites
        window.eventBus.$emit('updateSites', [])
        return
      }
      if (round(presTop, -2) === round(introRect, -2)) {
        // we're at the bottom, show all sites
        window.eventBus.$emit('updateSites', this.siteData)
        return
      }
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
    filterSites(dateVal, showNone=false, showAll=false) {
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
    max-height: 100%;
    top: 0;
    left: 0;
  }
  .subdued-text {
    font-size: 0.6em;
  }
</style>
