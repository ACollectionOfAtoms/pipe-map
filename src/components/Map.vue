<template>
  <div>
    <div id='map-container'></div>
    <slider></slider>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import Slider from 'components/Slider.vue'
import moment from 'moment'

export default {
  name: 'main-app',

  data() {
    return {
    }
  },

  components: {
    'slider': Slider
  },
  
  mounted() {
    this.createContainer()
    this.drawMap()
    this.drawAccidentBubbles()
    this.readCSV("../data/pipe-data.csv")
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
    drawAccidentBubbles() {
      d3.csv("../data/pipe-data.csv", data => {
          let self = this
          this.svg.selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function (d) {
                      return self.projection([d.longitude, d.latitude])[0]
                  })
                  .attr("cy", function (d) {
                      return self.projection([d.longitude, d.latitude])[1]
                  })
                  .attr("r", function (d) {
                      var gallons = parseInt(d.gallons) ?
                                    parseInt(d.gallons) :
                                    10000
                      return Math.sqrt(gallons * 0.0004)
                  })
                  .style("fill", "steelblue")
                  .style("opacity", 0.8)
      })
    },
    readCSV(f) {
      d3.csv(f)
          .row( d => {
            return {
              description: d.description,
              lat: d.latitude,
              lng: d.longitude,
              city: d.city,
              refLink: d['ref_link'],
              gallons: d.gallons,
              date: moment(d.date, "YYYY-MM-DD").unix(),
              accidentType: d['accident_type']
            }
          })
          .get( (err, rows) => {
            if (err) return console.error(err)
            window.site_data = rows  // This feels wrong.
          })
    },
    drawSites(data) {
      let sites = this.svg.selectAll(".site")
                            .data(data, d => {
                              return
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
</style>
