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
import * as d3scale from 'd3-scale'
import * as transition from 'd3-transition'
import * as d3format from 'd3-format'
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
    this.toolTipDiv = d3Select.select("body")
                                .append("div")
                                .attr("class", "tooltip hidden")
  },

  mounted() {
    this.createContainer()
    // create scale
    this.radiusFunc = d3scale.scaleSqrt()
                                .domain([0, 1e6])
                                .range([5, 50])
    this.enterRadius = "80" // size to transition from to actual radius
    this.exitRadius = "1"
    this.radialUnits = ""
    this.width = $("#map-container").width()
    this.height = $("#map-container").height()
    this.drawMap()
    this.drawLegend()
    // Draw legend TODO: make own method
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
      // enter
      sites.enter()
              .append('circle')
              .attr("class", d => {
                return this.setSiteClass(d.date.getFullYear())
              })
              .attr("cx", d => {
                return this.projection([d.lng, d.lat])[0]
              })
              .attr("cy", d => {
                return this.projection([d.lng, d.lat])[1] //can this be shortened?
              })
              .attr("r", d => {
                return this.enterRadius + this.radialUnits
              })
              .on('click', d => {
                let modalData = {
                  'title': d.date.getFullYear(),
                  'body': d.description
                }
                window.eventBus.$emit('showModal', modalData)
              })
              .on('mouseover', d => {
                if (!parseInt(d.gallons)) {
                  return
                }
                this.toolTipDiv.attr("class", "tooltip")
                let htmlString = `<span class='state-title'>${d.state}</span> <br/> ${d.gallons.toLocaleString()} <br/> <span class='gallons-label'>gallons</span>`
                this.toolTipDiv.html(htmlString)
                          .style("left", (d3Select.event.pageX + 20) + "px")
                          .style("top", (d3Select.event.pageY - 28) + "px")
              })
              .on('mouseout', d => {
                this.toolTipDiv.attr("class", "tooltip hidden")
              })
              .sort( (a, b) => {
                let aGallons = parseInt(a.gallons) ? a.gallons : 0,
                    bGallons = parseInt(b.gallons) ? b.gallons : 0
                return bGallons - aGallons
              })
              .transition().duration(400)
                .attr("r", d => {
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
                  d.gallons = parseInt(d.gallons) ?
                              parseInt(d.gallons) :
                              0
                  return this.radiusFunc(d.gallons) + this.radialUnits
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

      sites.exit()
        .transition().duration(200)
          .attr("r", this.exitRadius + this.radialUnits)
          .remove()
    },
    drawLegend() {
      this.legend = this.svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(" + (this.width - 80) + "," + (this.height - 40) + ")")
        .selectAll("g")
          .data([1e6, 5e5, 1e5])
        .enter().append("g");
      this.legend.append("circle")
          .attr("cy", d => { return -this.radiusFunc(d); })
          .attr("r", this.radiusFunc);

      this.legend.append("text")
          .attr("y", d => { return -2 * this.radiusFunc(d); })
          .attr("dy", "1.3em")
          .text(d3format.format(".1s"));
    },
    setSiteClass(year) {
      if (year == parseInt(this.currentYear)) {
        return 'site site-highlighted'
      }
      return 'site site-unhighlighted'
    },
    resizeMap() {
      this.legend.remove()
      this.width = $("#map-container").width()
      this.height = $("#map-container").height()
      this.projection
            .translate([this.width / 2, this.height / 2 ])
            .scale(this.width)
      this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px')
      let path = d3Geo.geoPath().projection(this.projection)
      this.svg.select('.land-boundary').attr('d', path)
      this.svg.select('.state-boundary').attr('d', path)
      this.drawLegend()
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
  @media only screen and (max-width: 768px) {
    svg {
      margin-left: 1%; /* Temporary hack to center map */
    }
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
    fill: #363636;
  }

  .site-highlighted {
    stroke-width: 1px;
    stroke: black;
    fill: #E9D542;
    opacity: 0.7;
  }
  .site:hover, .site-highlighted:hover {
    opacity: 1.0;
    stroke: black;
    fill: #85BBDD;
    cursor: pointer;
  }
  .legend circle {
    fill: #E9D542;
    stroke: black;
    opacity: 0.5;
  }

  .legend text {
    fill: black;
    font-family: "Courier New", Courier, monospace;
    font-size: 10px;
    text-anchor: middle;
  }
  .hidden {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
  }
  .tooltip {
      position: absolute;
      /*text-align: center;*/
      padding: 1%;
      font: 2.5vh sans-serif;
      background: #141E1E;
      color: white;
      border: 0px;
      border-radius: 8px;
      pointer-events: none;
  }
  .gallons-label {
      font-size: 1.8vh;
  }
  /*.state-title {
      font-size: 1.8vh;
  }*/
</style>
