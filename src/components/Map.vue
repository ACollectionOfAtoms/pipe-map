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
import $ from 'jquery'

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
    this.createTooltip()
    this.createContainer()
    if (window.innerWidth <= 622) {
      this.isMobile = true
    }
    // create scale
    this.radiusFunc = d3scale.scaleSqrt()
                                .domain([0, 1e6])
                                .range([5, 50])
    this.enterRadius = "80" // size to transition from to actual radius
    this.exitRadius = "1" // size to transition to before disappearing
    this.radialUnits = "em"
    this.radialModifer = 0.075
    this.width = $("#map-container").width()
    this.height = $("#map-container").height()
    this.drawMap()
    // Draw legend TODO: make own method
    d3Select.select(window).on('resize', this.resizeMap)
    this.drawLegend()
    this.resizeMap()
  },

  methods: {
    createContainer() {
      this.svg = d3Select.select("#map-container")
                      .append("svg")
                          .append("g")
    },
    drawMap() {
      let x = this.width / 2,
          y = this.isMobile ? this.height : this.height / 2
      this.projection = d3Geo.geoAlbersUsa()
      this.projection.scale(this.width)
      this.projection.translate([x, y])
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
                return (this.enterRadius)*this.radialModifer + this.radialUnits
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
                let formattedGallonsInt = d.gallons.toLocaleString(),
                    stateTitle = d.state
                this.toolTipDiv.classed("hidden", false);
                let htmlString = `<span class='state-title'>${stateTitle}</span> <br/> ${formattedGallonsInt} <br/> <span class='gallons-label'>gallons</span>`
                this.toolTipDiv.html(htmlString)
                          .style("left", (d3Select.event.pageX + 20) + "px")
                          .style("top", (d3Select.event.pageY - 28) + "px")
              })
              .on('mouseout', d => {
                this.toolTipDiv.classed("hidden", true);
              })
              .sort( (a, b) => {
                let aGallons = parseInt(a.gallons) ? a.gallons : 0,
                    bGallons = parseInt(b.gallons) ? b.gallons : 0
                return bGallons - aGallons
              })
              .transition().duration(650)
                .attr("r", d => {
                  d.gallons = parseInt(d.gallons) ?
                              parseInt(d.gallons) :
                              0
                  return this.radiusFunc(d.gallons)*this.radialModifer + this.radialUnits
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
          .attr("r", (this.exitRadius)*this.radialModifer + this.radialUnits)
          .remove()
    },
    drawLegend() {
      let x = this.width - this.width / 10,
          y = this.height - this.height / 10,
          spacing
      if (this.isMobile) {
          x = this.width / 3,
          y = this.height - this.height / 4
          spacing = this.height / 90
          this.legend = this.svg.append("g")
          .attr("class", "legend")
          .attr("transform", `translate(${x}, ${y})`)
            .selectAll("g")
              .data([149e4, 549e3, 149e3])
            .enter().append("g");
          this.legend.append("circle")
              .attr("cy", (d, i) => { if(i===0) {return -spacing/4 + this.radialUnits} return (i*spacing) + this.radialUnits})
              .attr("r", d => { return this.radiusFunc(d)*this.radialModifer + this.radialUnits});

          this.legend.append("text")
              .attr("y", (d, i) => {  return ((i)*spacing)/2.5 + this.radialUnits})
              .attr("x", x /1.15 )
              .attr("dy", "-.7" + this.radialUnits)
              .text(d3format.format(".1s"))
      } else {
        this.legend = this.svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${x}, ${y})`)
          .selectAll("g")
            .data([1e6, 5e5, 1e5])
          .enter().append("g");
        this.legend.append("circle")
            .attr("cy", d => { return -this.radiusFunc(d)*this.radialModifer + this.radialUnits})
            .attr("r", d => { return this.radiusFunc(d)*this.radialModifer + this.radialUnits});

        this.legend.append("text")
            .attr("y", d => { return  -2.4*this.radiusFunc(d)*this.radialModifer + this.radialUnits; })
            .attr("dy", "2.5" + this.radialUnits)
            .text(d3format.format(".1s"));
      }
    },
    setSiteClass(year) {
      if (year == parseInt(this.currentYear)) {
        return 'site site-highlighted'
      }
      return 'site site-unhighlighted'
    },
    resizeMap() {
      if (window.innerWidth <= 622) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
      this.legend.remove()
      this.width = $("#map-container").width()
      this.height = $("#map-container").height()
      let x = this.width / 2,
          y = this.isMobile ? this.height / 2 : this.height / 2
      this.projection
            .translate([x, y])
            .scale(this.width)
      this.svg
            .style("width", this.width + 'px')
            .style("height", this.height + 'px')
      let path = d3Geo.geoPath().projection(this.projection)
      this.svg.select('.land-boundary').attr('d', path)
      this.svg.select('.state-boundary').attr('d', path)
      this.drawLegend()
      this.drawSites(this.currentSiteData)
    },
    createTooltip() {
      // ensure a single tooltip
      if (document.getElementsByClassName('tooltip').length === 0) {
        this.toolTipDiv = d3Select.select("body")
                                    .append("div")
                                    .attr("class", "tooltip hidden")
      } else {
        this.toolTipDiv = d3Select.select('.tooltip')
      }
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
  	display: flex;

  	align-items: center;
    justify-content: center;
  }

  #map-container {
    width: 100%;
    height: 100vh;
  }
  /* hack to stop jerkyness on mobile */
  @media only screen and (max-width: 768px) {
    #map-component-container, #map-container {
      transition: height 999999s;
    }
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
    font-size: 1em;
    text-anchor: middle;
  }
  .hidden {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
  }
  .tooltip {
    position: absolute;
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
  @media only screen and (max-width: 622px) {
    svg {
      margin-left: 1%; /* Temporary hack to center map */
    }
    .legend text {
      font-size: 3em;
    }
  }
</style>
