<template>
  hi
  <div id='map-container'>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

export default {
  name: 'main-app',
  data() {
    return {
      hi: 'lol'
    }
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
      let projection = d3.geoAlbersUsa().scale([700])
      let path = d3.geoPath().projection(projection)
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
    }
  }
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

#slider3 {
  margin: 20px 0 10px 20px;
  width: 900px;
}
</style>
