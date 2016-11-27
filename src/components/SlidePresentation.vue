<template>
  <div>
    <div id='presentation-container'>
      <pipe-map :site-data='siteData'></pipe-map>
      <slide :isIntro='true' :id='introId'></slide>
      <!-- we forgo the use of a v-for directive to easily interrupt year cards with other cards -->
      <slide :isYear='true' :year="'2000'" :accidents="years[2000]['accidents']"></slide>
      <slide :isYear='true' :year="'2001'" :accidents="years[2001]['accidents']"></slide>

      <!-- 2001 alaskan accident -->
      <!-- <slide :isInfo='true' :id='info2010'></slide> -->

      <slide :isYear='true' :year="'2002'" :accidents="years[2002]['accidents']"></slide>
      <slide :isYear='true' :year="'2003'" :accidents="years[2003]['accidents']"></slide>
      <slide :isYear='true' :year="'2004'" :accidents="years[2004]['accidents']"></slide>
      <slide :isYear='true' :year="'2005'" :accidents="years[2005]['accidents']"></slide>
      <slide :isYear='true' :year="'2006'" :accidents="years[2006]['accidents']"></slide>
      <slide :isYear='true' :year="'2007'" :accidents="years[2007]['accidents']"></slide>
      <slide :isYear='true' :year="'2008'" :accidents="years[2008]['accidents']"></slide>
      <slide :isYear='true' :year="'2009'" :accidents="years[2009]['accidents']"></slide>
      <slide :isYear='true' :year="'2010'" :accidents="years[2010]['accidents']"></slide>

      <!-- Kalamzoo 2010 -->
      <slide :isInfo='true'
             :id="infoCardInfo['2010'].idName"
             :location="infoCardInfo['2010'].location"
             :description="infoCardInfo['2010'].description">
      </slide>

      <slide :isYear='true' :year="'2011'" :accidents="years[2011]['accidents']"></slide>
      <slide :isYear='true' :year="'2012'" :accidents="years[2012]['accidents']"></slide>
      <slide :isYear='true' :year="'2013'" :accidents="years[2013]['accidents']"></slide>
      <slide :isYear='true' :year="'2014'" :accidents="years[2014]['accidents']"></slide>
      <slide :isYear='true' :year="'2015'" :accidents="years[2015]['accidents']"></slide>
      <slide :isYear='true' :year="'2016'" :accidents="years[2016]['accidents']"></slide>
      <slide :isOutro='true' :id='outroId'></slide>
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
      outroId: 'outro-card',
      infoCardInfo: {
        '2010': {
          idName: 'info2010', // Used to dictate bg image in InfoCard.vue
          location: 'Marshall, Michigan',
          description: 'On July 26, the Kalamazoo River oil spill: Enbridge Energy Partners LLP (Enbridge), reported that a 30-inch (760 mm) pipeline belonging to Enbridge burst in Marshall, Michigan. Enbridge had numerous alarms from the affected Line 6B, but controllers thought the alarms were from phase separation, and the leak was not reported to Enbridge for 17 hours. '
        }
      }
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
        if (el && utils.isElementInViewport(el)) {
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
