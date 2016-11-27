<template>
  <div>
    <div id='presentation-container'>
      <pipe-map :site-data='siteData'></pipe-map>
      <slide :isIntro='true'></slide>
      <!-- start years slides -->
      <slide v-for='(obj, year, index) in years'
             :isYear='true'
             :ref='index'
             :year='year'
             :accidents="obj.accidents"
      ></slide>
      <!-- end year slides -->

      <!-- start outro slide -->
      <slide :id='outroId' :isOutro='true'></slide>
      <!-- end outro slide -->
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
      presContainer: $(window),
      yearsRange: dateRange,
      // the below (`year`) is like python dict comprehension
      years: dateRange.reduce((obj, x) => Object.assign(obj, { [x]: {'accidents': 0} }), {}),
      totalAccidents: 0,
      currentYear: 2000,
      yearStack: [], // aids in ensuring we call filter for years only once.
      introId: 'intro-card',
      outroId: 'outro-card'
    }
  },

  components: {
    'slide': Slide,
    'pipe-map': PipeMap,
  },

  mounted() {
    this.presContainer.on('scroll.scroller', this.trackTime)
  },

  updated() { // ensure we render sites on reload of page
    this.trackTime()
  },

  methods: {
    filterSites() {
      // Ensure one-time firing by creating a 'year' stack
      if (this.yearStack[this.yearStack.length - 1] !== this.currentYear
          && this.siteData.length > 1) {

        this.updateYearStack(this.currentYear)
        let currentYear = this.currentYear.toString()
        window.eventBus.$emit('updateCurrentYear', currentYear)

        let newData = filter(this.siteData, d => {
          return d.date.getFullYear() <= currentYear
        })
        let currentYearData = filter(newData, d => {
          return currentYear == d.date.getFullYear()
        })
        this.totalAccidents = newData.length
        Vue.set(this.years[currentYear], 'accidents', currentYearData.length)
        window.eventBus.$emit('updateSites', newData)
        // this.easeSiteExposure(currentYearData, 2)
      }
    },
    easeSiteExposure(dataList, time) {
      // TODO: make this work! (sequentially display sites)
      let interval = time / dataList.length,
          ticker = interval,
          growingData;
      for (let i = 1; i < dataList.length + 1; i++) {
        setTimeout( () => {
          growingData = dataList.slice(0, i)
          window.eventBus.$emit('updateSites', growingData)
        }, ticker*1000)
        ticker += interval
      }
    },
    updateYearStack(year) {
      // If a user refreshes while at ex: 2014,
      // we compensate for this by constructing the stack accordingly
      let years = this.yearsRange
      let yearIndex = years.indexOf(year) + 1
      this.yearStack = years.slice(0, yearIndex)
    },
    trackTime() {
      // TODO: Refactor for performance!
      let presTop = this.presContainer.scrollTop()
      if (presTop === 0) {
        // We're at the top, remove all sites
        this.yearStack = []
        window.eventBus.$emit('updateSites', [])
        return
      }
      for (let year of this.yearsRange) { // this block is a good candidate for
        let cardId = '#' + year + '-card' // performance centric refactor
        let el = $(cardId)

        if (utils.isElementInViewport(el)) {
          this.currentYear = year
          this.filterSites()
        }
      }
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
</style>
