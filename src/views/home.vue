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
    this.loadCSV("../data/pipe-data.csv")
  },

  methods: {
    loadCSV(f) { //could be moved to utils
      d3Request.csv(f)
          .row( d => {
            return {
              uuid: d.uuid,
              description: d.description,
              lat: d.latitude,
              lng: d.longitude,
              city: d.city,
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
  body {
    font-family: "Courier New", Courier, monospace;
    margin: 0;
  }
  #main-container, #app {
    height: 100%;
    width: 100%;
  }
</style>
