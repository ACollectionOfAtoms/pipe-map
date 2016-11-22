<template>
  <div id='map-component-container'>
    <div id='map-container'></div>
  </div>
</template>

<script>
/* with reference to http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8 */
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

export default {
  name: 'main-app',

  props: {
    siteData: {}
  },

  data() {
    return {
      displayedSites: []
    }
  },

  created() {
    window.eventBus.$on('updateSites', d => {
      this.drawSites(d)
    })
  },

  mounted() {
    this.createContainer()
    this.drawMap()
    d3.select(window).on('resize', this.sizeChange)
    this.sizeChange()
  },

  methods: {
    createContainer() {
      let w = window.innerWidth,
          h = window.innerHeight
      this.svg = d3.select("#map-container")
                      .append("svg")
                      .attr("width", "100%")
                      .attr("margin-top", "50%")
                      .attr("height", "100%")
                        .append("g")

    },
    drawMap() {
      this.projection = d3.geoAlbersUsa()
      let path = d3.geoPath().projection(this.projection)
      d3.json("../data/us.json", (error, json) => {
        if (error) return console.log(error)
        this.svg.append("path")
              .datum(topojson.feature(json, json.objects.land))
              .attr("d", path)
              .attr("class", "land-boundary")
        // this.svg.append("path")
        //       .datum(topojson.mesh(json, json.objects.counties, function(a, b) {  return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
        //       .attr("d", path)
        //       .attr("class", "county-boundary")
        this.svg.append("path")
              .datum(topojson.mesh(json, json.objects.states, function(a, b) {return a !== b; }))
              .attr("d", path)
              .attr("class", "state-boundary")
      })
    },
    drawSites(data) {
      this.displayedSites = data
      let sites = this.svg.selectAll(".site")
                            .data(data, d => {
                              return d['uuid']
                            })
      sites.enter().append("circle")
              .on('click', d => {
                let modalData = {
                  'title': d.date.getFullYear(),
                  'body': d.description
                }
                window.eventBus.$emit('showModal', modalData)
              })
              .attr("class", 'site')
              .attr("cx", d => {
                return this.projection([d.lng, d.lat])[0]
              })
              .attr("cy", d => {
                return this.projection([d.lng, d.lat])[1] //can this be shortened?
              })
              .attr("r", 1)
              .transition().duration(400)
                .attr("r", d => {
                  let exception = 'Kalamazoo'
                  // Python parser failed to catch this one.
                  if (d.description.includes(exception)) {
                      d.gallons = 800000
                  }
                  let gallons = parseInt(d.gallons) ?
                                parseInt(d.gallons) :
                                10000
                  return Math.sqrt(gallons * 0.001)
                })
      sites.exit()
        .transition().duration(200)
          .attr("r", 1)
          .remove()
    },
    sizeChange() {
      d3.select("g").attr("transform", "scale(" + $("#map-container").width()/900 + ")")
	    $("svg").height($("#map-container").width()*0.618)
    }
  }
}
</script>

<style>
  #map-component-container, #map-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    height: 25vh;
    width: 25vw;
    border: 1px solid black;
  }
  #map-container {
    margin: auto;
  }
  path {
    fill: none;
    stroke: #AAAAAA;
    stroke-width: .5px;
  }
  .land-boundary {
    stroke-width: 1px;
  }
  .county-boundary {
    stroke: #ddd;
  }
  .site {
  	stroke-width: 1px;
    stroke: #1d1f20;
    fill: #1d1f20;
    opacity: 0.75;
  }
  .site:hover {
    stroke-width: 4px;
    opacity: 0.9;
    fill: #1d1f20;
    stroke: #1d1f20;
    cursor: pointer;
  }
</style>
