<template>
  <div>
    <div id='map-container'></div>
  </div>
</template>

<script>
/* with reference to http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8 */
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import moment from 'moment'

export default {
  name: 'main-app',

  data() {
    return {
      drawnSites: Array
    }
  },

  created() {
    window.eventBus.$on('sliderChange', d => {
      this.drawSites(d)
    })
  },

  mounted() {
    this.createContainer()
    this.drawMap()
  },

  methods: {
    createContainer() {
      let w = 800,
          h = 500
      this.svg = d3.select("#map-container")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h)
    },
    drawMap() {
      this.projection = d3.geoAlbersUsa().scale([700])
      let path = d3.geoPath().projection(this.projection)
      d3.json("../data/us.json", (error, json) => {
        if (error) return console.log(error)
        this.svg.append("path")
              .datum(topojson.feature(json, json.objects.land))
              .attr("d", path)
              .attr("class", "land-boundary")
        this.svg.append("path")
              .datum(topojson.mesh(json, json.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
              .attr("d", path)
              .attr("class", "county-boundary")
        this.svg.append("path")
              .datum(topojson.mesh(json, json.objects.states, function(a, b) { return a !== b; }))
              .attr("d", path)
              .attr("class", "state-boundary")
      })
    },
    drawSites(data) {
      this.drawnSites = data
      window.eventBus.$emit('drawnSitesUpdated', data)
      let sites = this.svg.selectAll(".site")
                            .data(data, d => {
                              return d.lng + d.lat
                            })
      sites.enter().append("circle")
              .attr("class", "site")
              .attr("cx", d => {
                return this.projection([d.lng, d.lat])[0]
              })
              .attr("cy", d => {
                return this.projection([d.lng, d.lat])[1] //can this be shortened?
              })
              .attr("r", 1)
              .transition().duration(400)
                .attr("r", d => {
                  let gallons = parseInt(d.gallons) ?
                                parseInt(d.gallons) :
                                10000
                  return Math.sqrt(gallons * 0.0004)
                })
      sites.exit()
        .transition().duration(200)
          .attr("r", 1)
          .remove()
    }
  },
}
</script>

<style>
  path {
    fill: none;
    stroke: #333;
    stroke-width: .5px;
  }

  .land-boundary {
    stroke-width: 1px;
  }

  .county-boundary {
    stroke: #ddd;
  }

  .site {
  	stroke-width: .5px;
    stroke: #333;
    fill: #9cf;
  }
</style>
