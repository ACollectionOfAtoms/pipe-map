<template>
  <div class='container'>
    <pipe-map :site-data='siteData'
              :filtered-data='filteredData'></pipe-map>
    <slider :site-data='siteData'
            :filtered-data='filteredData'></slider>
  </div>
</template>

<script>
import PipeMap from 'components/Map.vue'
import Slider from 'components/Slider.vue'
import moment from 'moment'
import Vue from'vue'
import * as d3 from 'd3' //TODO: import what's needed

export default {
  name: 'main-app',

  data() {
      return {
        siteData: [],
        filteredData: []
      }
  },

  components: {
    'pipe-map': PipeMap,
    'slider': Slider
  },

  mounted() {
    this.loadCSV("../data/pipe-data.csv")
  },

  methods: {
    loadCSV(f) {
      d3.csv(f)
          .row( d => {
            return {
              description: d.description,
              lat: d.latitude,
              lng: d.longitude,
              city: d.city,
              refLink: d['ref_link'],
              gallons: d.gallons,
              date: moment(d.date, "YYYY-MM-DD").unix(),
              accidentType: d['accident_type']
            }
          })
          .get( (err, rows) => {
            if (err) return console.error(err)
            this.siteData = rows  // This feels wrong.
          })
    }
  }
}
</script>

<style>
</style>
