<template>
  <div id='main-container'>
    <modal></modal>
    <app-header></app-header>
    <!-- <pipe-map :site-data='siteData'></pipe-map> -->
    <slide-pres :site-data='siteData'></slide-pres>
    <!-- <slider :site-data='siteData'></slider> -->
    <!-- <scroller :site-data='siteData'></slide> -->
  </div>
</template>

<script>
import Header from 'components/Header.vue'
import PipeMap from 'components/Map.vue'
import Slide from 'components/Slide.vue'
import SlidePresentation from 'components/SlidePresentation.vue'
import Slider from 'components/Slider.vue'
import Scroller from 'components/DescriptionScroller.vue'
import Modal from 'components/Modal.vue'
import moment from 'moment'
import Vue from'vue'
import utils from 'utils'
import * as d3 from 'd3' //TODO: import what's needed

export default {
  name: 'main-app',

  data() {
      return {
        siteData: []
      }
  },

  components: {
    'pipe-map': PipeMap,
    'slider': Slider,
    'modal': Modal,
    'scroller': Scroller,
    'app-header': Header,
    'slide-pres': SlidePresentation,
    'slide': Slide
  },

  mounted() {
    this.loadCSV("../data/pipe-data.csv")
  },

  methods: {
    loadCSV(f) { //could be moved to utils
      d3.csv(f)
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
    font-family: Geneva, Tahoma, Verdana, sans-serif;
    margin: 0;
  }
  #main-container, #app {
    height: 100vh;
    width: 100vw;
  }
</style>
