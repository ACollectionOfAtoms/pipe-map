<template>
  <div id='map-component-container'>
    <div id='map-container'>
    </div>
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
      displayedSites: [],
      drawnSites: {},
      currentYear: 2000
    }
  },

  created() {
    window.eventBus.$on('updateSites', d => {
      this.drawSites(d)
    })
    window.eventBus.$on('updateCurrentYear', d => {
      this.currentYear = d
    })
  },

  mounted() {
    this.createContainer()
    this.drawMap()
    // d3.select(window).on('resize', this.sizeChange)
    // this.sizeChange()
  },

  methods: {
    createContainer() {
      this.svg = d3.select("#map-container")
                      .append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%")
                          .append("g")
    },
    drawMap() {
      let size = $('#map-container').width()
      this.projection = d3.geoAlbersUsa()
      this.projection.scale(size)
      this.projection.translate([size / 2, size / 3]);
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
      let sites = this.svg.selectAll('.site, .site-unhighlighted, .site-highlighted')
                            .data(data, d => {
                              return d['uuid']
                            })

      //update
      sites.attr("class", d => {
        if (d.date.getFullYear() == parseInt(this.currentYear)) {
          return 'site-highlighted'
        }
        return 'site site-unhighlighted'
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
                if (d.date.getFullYear() == parseInt(this.currentYear)) {
                  return 'site-highlighted'
                }
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
      let containerWidth = this.svg.style("width")
      console.log(containerWidth)
      d3.select("g").attr("transform", "scale(" + $("#map-container").width()/900 + ")")
	    $("svg").height($("#map-container").width()*2)
    }
  }
}
</script>

<style>
  #map-component-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #map-container {
    width: 80%;
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
    opacity: 0.75;
    stroke: #363636;
    fill: #363636;
  }
  .site-highlighted {
    stroke-width: 1px;
    stroke: #E9D542;
    fill: #E9D542;
    opacity: 0.75;
  }
  .site:hover {
    stroke-width: 4px;
    opacity: 0.9;
    fill: #363636;
    stroke: #363636;
    cursor: pointer;
  }
</style>
