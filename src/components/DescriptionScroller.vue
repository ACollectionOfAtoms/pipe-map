<template>
  <div>
    <div class='scroll-container'>
      <ul class='scroll-list'>
        <li v-for='data in siteData' class='focused-li'>
          {{ data.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* Inspired by http://bl.ocks.org/tonyhschu/af64df46f7b5b760fc1db1260dd6ec6a */
import * as d3 from 'd3'

export default {

  data() {
    return {
      drawnSites: Array,
      currentDescription: 0 // Keep track of which is in view
    }
  },

  props: {
    siteData: Array
  },

  mounted() {
    //must deal with resizing
    window.eventBus.$on('drawnSitesUpdated', d => {
      this.updateDescripitions(d)
    })
    this.height = window.innerHeight
    this.listContainer = d3.select('.scroll-container')
    this.scrollLength = this.listContainer.node()
                              .getBoundingClientRect().height
    this.scrollLength += 2*(this.scrollLength*(.20)) // .1 is padding, times 2 for top and bottom
    this.descriptionLength = this.scrollLength + (.5)*this.scrollLength
    this.newScrollTop = 0

    this.listContainer.on("scroll.scroller", () => {
      // account for a decrease or increase in scrolling
      // increment and decrement scrollLength as needed
      this.newScrollTop = this.listContainer.node().scrollTop
      if (this.newScrollTop >= this.scrollLength) {
        this.currentDescription += 1
        this.scrollLength += this.descriptionLength
        console.log(this.currentDescription)
      }
    })
  },

  methods: {
    updateDescripitions(d) {
      if (d.length > 0) {
        this.drawnSites = d
      }
    }
  }
}
</script>

<style>
.scroll-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1000;
  overflow-y: scroll;
}

.scroll-list, .focused-li {
  height: 100%
}

.focused-li {
  padding-top: 10%;
}
</style>
