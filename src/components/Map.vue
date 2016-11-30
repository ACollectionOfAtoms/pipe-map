<template>
  <div id='map-component-container'>
    <div id='map-container'>
    </div>
  </div>
</template>

<script>
/* with reference to http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8 */
import * as d3Select from 'd3-selection'
import * as d3Request from 'd3-request'
import * as d3Geo from 'd3-geo'
import * as transition from 'd3-transition'
import * as topojson from 'topojson-client'

export default {
  name: 'main-app',

  props: {
    siteData: {}
  },

  data() {
    return {
      currentYear: 2000,
      currentSiteData: []
    }
  },

  created() {
    window.eventBus.$on('updateSites', d => {
      this.currentSiteData = d
      this.drawSites(d)
    })
    window.eventBus.$on('updateCurrentYear', d => {
      this.currentYear = d
    })
  },

  mounted() {
    this.createContainer()
    this.width = $("#map-container").width()
    this.height = $("map-container").height()
    this.drawMap()
    d3Select.select(window).on('resize', this.resizeMap)
    this.resizeMap()
  },

  methods: {
    createContainer() {
      this.svg = d3Select.select("#map-container")
                      .append("svg")
                          .append("g")
    },
    drawMap() {
      this.projection = d3Geo.geoAlbersUsa()
      this.projection.scale(this.width)
      this.projection.translate([this.width / 2, this.height / 2]);
      let path = d3Geo.geoPath().projection(this.projection)
      d3Request.json("../data/us.json", (error, json) => {
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
      let sites = this.svg.selectAll('.site, .site-unhighlighted, .site-highlighted')
                            .data(data, d => {
                              return d['uuid']
                            })

      //update
      sites.attr("class", d => {
        return this.setSiteClass(d.date.getFullYear())
      })
      // below are to ensure responsiveness of sites
      .attr("cx", d => {
        return this.projection([d.lng, d.lat])[0]
      })
      .attr("cy", d => {
        return this.projection([d.lng, d.lat])[1] //can this be shortened?
      })

      // enter
      sites.enter().append('circle')
              .on('click', d => {
                let modalData = {
                  'title': d.date.getFullYear(),
                  'body': d.description
                }
                window.eventBus.$emit('showModal', modalData)
              })
              .attr("class", d => {
                return this.setSiteClass(d.date.getFullYear())
              })
              .attr("cx", d => {
                return this.projection([d.lng, d.lat])[0]
              })
              .attr("cy", d => {
                return this.projection([d.lng, d.lat])[1] //can this be shortened?
              })
              .attr("r", 1)
              .transition().duration(400)
                .attr("r", d => {
                  // Python parser failed to catch this one.
                  if (d.description.includes('Kalamazoo')) {
                      d.gallons = 800000
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
    setSiteClass(year) {
      if (year == parseInt(this.currentYear)) {
        return 'site site-highlighted'
      }
      return 'site site-unhighlighted'
    },
    resizeMap() {
      this.width = $("#map-container").width()
      this.height = $("#map-container").height()
      this.projection
            .translate([this.width /2, this.height / 2 ])
            .scale(this.width)
      this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px')
      let path = d3Geo.geoPath().projection(this.projection)
      this.svg.select('.land-boundary').attr('d', path)
      this.svg.select('.state-boundary').attr('d', path)
      this.drawSites(this.currentSiteData)
    }
  }
}
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  #map-component-container {
    position: fixed;
    height: 100%;
    width: 100%;
    display: -ms-flexbox;
  	display: -webkit-flex;
  	display: flex;

  	-ms-flex-align: center;
  	-webkit-align-items: center;
  	-webkit-box-align: center;

  	align-items: center;
    justify-content: center;
  }

  #map-container {
    border: 1px solid black;
    width: 100%;
    height: 100%;
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
    opacity: 0;
  }
  .site-unhighlighted {
    stroke-width: 1px;
    opacity: 0.5;
    stroke: #363636;
    fill: #363636;
  }
  .site-highlighted {
    stroke-width: 1px;
    stroke: #E9D542;
    fill: #E9D542;
    opacity: 0.8;
  }
  .site:hover, .site-highlighted:hover {
    stroke-width: 4px;
    opacity: 0.9;
    stroke: #E9D542;
    fill: #E9D542;
    cursor: pointer;
  }
</style>
