<template>
  <div id='main-container'>
    <modal></modal>
    <app-header></app-header>
    <slide-pres :site-data='siteData'></slide-pres>
  </div>
</template>

<script>
import Header from 'components/Header.vue'
import PipeMap from 'components/Map.vue'
import Slide from 'components/Slide.vue'
import SlidePresentation from 'components/SlidePresentation.vue'
import Modal from 'components/Modal.vue'
import moment from 'moment'
import Vue from'vue'
import utils from 'utils'
import * as d3Request from 'd3-request'
import jQuery from 'jquery'

export default {
  name: 'main-app',

  data() {
      return {
        siteData: []
      }
  },

  components: {
    'pipe-map': PipeMap,
    'modal': Modal,
    'app-header': Header,
    'slide-pres': SlidePresentation,
    'slide': Slide
  },

  mounted() {
    let bg = jQuery("body");
    this.loadCSV("../data/pipe-data.csv")
  },

  methods: {
    loadCSV(f) { //could be moved to utils
      d3Request.csv(f)
          .row( d => {
            // Python parser failed to catch this one.
            if (d.description.includes('Kalamazoo')) {
                d.gallons = 1139569
            }
            // ...and this one.
            if (d.description.includes('Blackman Charter Township, Michigan')) {
                d.gallons = 75000
            }
            // ..and this one.
            if (d.description.includes('Cohasset, Minnesota')) {
                d.gallons = 252000
            }
            // ..and this one.
            if (d.description.includes('Rusk County, Wisconsin')) {
                d.gallons = 201600
            }
            // ... and this one
            if (d.description.includes('Douglas County, Wisconsin')) {
                d.gallons = 100000
            }
            if (d.description.includes('Winchester, Kentucky, a Marathon Oil')) {
                d.gallons = 490000
            }
            // .. and this one
            if (d.description.includes('Lockport, Illinois. EPA')) {
                d.gallons = 270000
            }
            return {
              uuid: d.uuid,
              description: d.description,
              lat: d.latitude,
              lng: d.longitude,
              city: d.city,
              state: d.state,
              refLink: d['ref_link'],
              gallons: d.gallons,
              date: new Date(d.date),
              accidentType: d['accident_type']
            }
          })
          .get( (err, rows) => {
            if (err) return console.error(err)
            this.siteData = rows
          })
    }
  }
}
</script>

<style>
  /* commandeer the em unit here */
  html, body {
    font-family: georgia, "times new roman", times, serif;
    margin: 0;
    font-size: 12px;
  }
  @media only screen and (max-width: 768px) {
    body {
      font-size: 8px;
    }
  }
  @media only screen and (min-width: 768px)
         and (max-width: 1400px){
    body {
      font-size: 16px;
    }
  }
  @media only screen and (min-width: 1400px)
         and (max-width: 2880px) {
    body {
      font-size: 24px;
    }
  }
</style>
