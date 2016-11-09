<template>
  <div id="slider-container">
    <svg width="800" height="45" id='slider-svg'></svg>
  </div>
</template>

<script>
/* An adaptation of https://bl.ocks.org/mbostock/6499018 */
import * as d3 from 'd3'
import filter from 'lodash.filter'
import moment from 'moment'
// TODO: Needs MASSIVE clean up!
export default {
  data() {
      return {
        ticks: 16,
        minDate: moment('2000-01-01', 'YYYY-MM-DD').unix(),
        maxDate: moment('2016-12-30', 'YYYY-MM-DD').unix(),
        firstIncident: moment('2000-01-11', 'YYYY-MM-DD').unix(), 
        handleRadius: 9
      }
  },

  props: {
    siteData: Array
  },

  mounted() {
    this.drawSlider()
  },

  methods: {
    drawSlider() {
      let svg = d3.select("#slider-svg"),
          margin = {right: 80, left: 80},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height")
      let scale = [this.minDate, this.maxDate]
      let x = d3.scaleLinear()
          .domain(scale)
          .range([0, width])
          .clamp(true)
      this.slider = svg.append("g")
          .attr("class", "slider")
          .attr("transform", "translate(" + margin.left + "," + height / 2 + ")")
          this.slider.append("line")
              .attr("class", "track")
              .attr("x1", x.range()[0])
              .attr("x2", x.range()[1])
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr("class", "track-inset")
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr("class", "track-overlay")
              .call(d3.drag()
                  .on("start.interrupt", () => { this.slider.interrupt(); })
                  .on("start drag", () => {changeDate(x.invert(d3.event.x)); }))
          this.slider.insert("g", ".track-overlay")
              .attr("class", "ticks")
              .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(this.ticks))
            .enter().append("text")
              .attr("x", x)
              .attr("text-anchor", "middle")
              .text(d => {
                let date = d* 1000
                return new Date(date).getFullYear()
              })
      var handle = this.slider.insert("circle", ".track-overlay")
          .attr("class", "handle")
          .attr("r", this.handleRadius)
      this.slider.transition()
          .duration(750)
          .tween("changeDate", () => {
            let i = d3.interpolate(this.minDate, this.firstIncident)
            return function(t) {
              changeDate(i(t))
            }
          })
      let self = this
      function changeDate(t) {
        handle.attr("cx", x(t));
        self.onSlide(t)
      }
    },
    onSlide(dateVal) {
      let newData = filter(this.siteData, d => {
        return d.date <= dateVal
      })
      window.eventBus.$emit('sliderChange', newData)
    }
  }
}
</script>

<style>
#slider-svg {
  width: 100%;
}

.ticks {
  font: 10px sans-serif;
}

.track,
.track-inset,
.track-overlay {
  stroke-linecap: round;
}

.track {
  stroke: #000;
  stroke-opacity: 0.3;
  stroke-width: 10px;
}

.track-inset {
  stroke: #ddd;
  stroke-width: 8px;
}

.track-overlay {
  pointer-events: stroke;
  stroke-width: 50px;
  cursor: crosshair;
}

.handle {
  fill: #fff;
  stroke: #000;
  stroke-opacity: 0.5;
  stroke-width: 1.25px;
}

</style>
