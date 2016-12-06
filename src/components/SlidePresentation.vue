<template>
  <div>
    <div id='presentation-container'>
      <pipe-map :site-data='siteData'></pipe-map>
      <slide :isIntro='true' :id='introId'></slide>
      <!-- we forgo the use of a v-for directive to easily interrupt year cards with infoCards -->
      <slide :isYear='true' :year="'2000'" :accidents="years[2000]['accidents']"></slide>

      <slide :isYear='true' :year="'2001'" :accidents="years[2001]['accidents']"></slide>
      <!-- 2001 alaskan accident -->
      <slide :isInfo='true'
             :id="infoCardInfo['2001'].idName"
             :location="infoCardInfo['2001'].location"
             :description="infoCardInfo['2001'].description">
      </slide>

      <slide :isYear='true' :year="'2002'" :accidents="years[2002]['accidents']"></slide>
      <slide :isYear='true' :year="'2003'" :accidents="years[2003]['accidents']"></slide>
      <slide :isYear='true' :year="'2004'" :accidents="years[2004]['accidents']"></slide>
      <slide :isYear='true' :year="'2005'" :accidents="years[2005]['accidents']"></slide>

      <slide :isInfo='true'
             :id="infoCardInfo['2005'].idName"
             :location="infoCardInfo['2005'].location"
             :description="infoCardInfo['2005'].description">
      </slide>

      <slide :isYear='true' :year="'2006'" :accidents="years[2006]['accidents']"></slide>
      <slide :isYear='true' :year="'2007'" :accidents="years[2007]['accidents']"></slide>
      <slide :isYear='true' :year="'2008'" :accidents="years[2008]['accidents']"></slide>

      <slide :isInfo='true'
             :id="infoCardInfo['2008'].idName"
             :location="infoCardInfo['2008'].location"
             :description="infoCardInfo['2008'].description">
      </slide>

      <slide :isYear='true' :year="'2009'" :accidents="years[2009]['accidents']"></slide>
      <slide :isYear='true' :year="'2010'" :accidents="years[2010]['accidents']"></slide>

      <!-- Kalamzoo 2010 -->
      <slide :isInfo='true'
             :id="infoCardInfo['2010'].idName"
             :location="infoCardInfo['2010'].location"
             :description="infoCardInfo['2010'].description">
      </slide>

      <slide :isYear='true' :year="'2011'" :accidents="years[2011]['accidents']"></slide>

      <slide :isInfo='true'
             :id="infoCardInfo['2011'].idName"
             :location="infoCardInfo['2011'].location"
             :description="infoCardInfo['2011'].description">
      </slide>

      <slide :isYear='true' :year="'2012'" :accidents="years[2012]['accidents']"></slide>
      <slide :isYear='true' :year="'2013'" :accidents="years[2013]['accidents']"></slide>

      <slide :isInfo='true'
             :id="infoCardInfo['2013'].idName"
             :location="infoCardInfo['2013'].location"
             :description="infoCardInfo['2013'].description">
      </slide>

      <slide :isYear='true' :year="'2014'" :accidents="years[2014]['accidents']"></slide>
      <!-- Harlem 2014 -->
      <slide :isInfo='true'
             :id="infoCardInfo['2014'].idName"
             :location="infoCardInfo['2014'].location"
             :description="infoCardInfo['2014'].description">
      </slide>


      <slide :isYear='true' :year="'2015'" :accidents="years[2015]['accidents']"></slide>

      <!-- Refugio Beach Cali -->
      <slide :isInfo='true'
             :id="infoCardInfo['2015'].idName"
             :location="infoCardInfo['2015'].location"
             :description="infoCardInfo['2015'].description">
      </slide>

      <slide :isYear='true' :year="'2016'" :accidents="years[2016]['accidents']"></slide>

      <!-- <slide :isOutro='true' :id='outroId'></slide> -->
    </div>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'
import Slide from 'components/Slide.vue'
import filter from 'lodash.filter'
import sortby from 'lodash.sortby'
import debounce from 'lodash.debounce'
import utils from 'utils'
import Vue from 'vue'
import $ from 'jquery'

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
        '2000': {
          idName: 'info2000',
          location: 'Township, Michigan',
          description: "On June 7, a stopple fitting weld failed on a Wolverine Pipeline Company line, causing a rupture releasing 75,000 US gallons (280,000 L) of gasoline into the environment, and causing the evacuation of more than 500 houses..."
        },
        '2001': {
          idName: 'info2001',
          location: 'Alaska',
          description: "On October 4th, Daniel Lewis shot a .338 caliber rifle in the Trans-Alaska Pipeline. The pressure caused the oil to spew about 75 feet over a nearby road. Crews cleaned up over 260,000 gallons. Lewis was charged with a DWI, felony assault, weapons misconduct and criminal mischief."
        },
        '2005': {
          idName: 'info2005',
          location: 'Carrollton, Kentucky',
          description: "A pipeline near Carrollton, Kentucky spilled 290,000 gallons of crude oil into the Kentucky River. Crews rushed to contain the 10 mile oil slick which the Mid-Valley Pipeline Company (Mid-Valley) and pipeline operator Sunoco Pipeline L.P. were fined $2.57 million."
        },
        '2008': {
          idName: 'info2008',
          location: 'Golden Gate, Illinois',
          description: "A 20-inch pipeline ruptured near Golden Gate, IL on August 10th. 210,000 gallons spilled into the surrounding area. The restoration effort included 7.1 acres of forest wetlands and 14.2 acres of agricultural fields located near the spill. Workers installed pumps and planted trees to repair the environmental damage."
        },
        '2010': {
          idName: 'info2010', // Used to dictate bg image in InfoCard.vue
          location: 'Ceresco, Michigan',
          description: "Cleanup started immediately after the Kalamazoo River oil spill from the Canadian pipeline company Enbridge. The company was fined $61 million as part the settlement following the 840,000 gallon leak in July 2010. The oil flowed for about 17 hours before it was shut off."
        },
        '2011': {
          idName: 'info2011',
          location: 'Nemaha, Nebraska',
          description: "On December 10th, a bulldozer operator had struck an unmarked pipeline causing a leak of 252,000 gallons. Magellan Midstream Partners estimated a combination of jet fuel, gasoline and diesel leaked a total of 119,028 into the countryside."
        },
        '2013': {
          idName: 'info2013',
          location: 'Tioga, North Dakota',
          description: "Steve Jensen saw and smelled crude oil come out of the ground on his 1,800 acre farm on September 29th. A Tesoro pipeline leaked about 865,000 gallons across 7 acres. Cleanup took roughly 3 years but fueling in Tioga, ND has resumed since."
        },
        '2014': {
          idName: 'info2014',
          location: 'Harlem, New York City',
          description: "At 9:31 AM on March 12, 2014, a natural gas explosion leveled two apartment buildings in East Harlem in New York City. The leak started several hours prior and the initial blast killed 8 people. About 100 families were displaced in Manhattan..."
        },
        '2015': {
          idName: 'info2015',
          location: 'Refugio Beach, California',
          description: "124,000 U.S. Gallons of crude oil soaked Refugio Beach and wildlife on May 19th. Texas company Plains All American Pipeline was eventually indicted for spilling oil in state waters. The cleanup is ongoing and the California EPA..."
        }
      }
    }
  },

  components: {
    'slide': Slide,
    'pipe-map': PipeMap,
  },

  mounted() {
    this.presContainer.on('scroll.scroller', debounce(this.trackTime, 10))
    if (window.innerWidth <= 622) {
      this.isMobile = true
    }
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
        newData = sortby(newData, ['date'])
        let currentYearData = filter(newData, d => {
          return currentYear == d.date.getFullYear()
        })
        this.totalAccidents = newData.length
        Vue.set(this.years[currentYear], 'accidents', currentYearData.length)
        if (this.isMobile) {
          window.eventBus.$emit('updateSites', currentYearData)
        } else {
          window.eventBus.$emit('updateSites', newData)
        }
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
      $('.tooltip').addClass('hidden') // This Map related logic shouldn't be here...
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
    top: 0;
    left: 0;
    height: 100%;
  }
</style>
