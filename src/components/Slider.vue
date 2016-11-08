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
        scale: [moment('2000-01-01', 'YYYY MM DD').unix(),
                moment('2016-12-30', 'YYYY MM DD').unix()],
        ticks: 16,
        minDate: moment('2000-01-01', 'YYYY MM DD').unix(),
        maxDate: moment('2016-12-30', 'YYYY MM DD').unix(),
        secondsInDay: 60 * 60 * 24
      }
  },

  props: {
    siteData: Array
  },

  mounted() {
    var svg = d3.select("#slider-svg"),
        margin = {right: 80, left: 80},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height");

    var hueActual = 0,
        hueTarget = 1072418400,
        hueAlpha = 0.2

    var x = d3.scaleLinear()
        .domain(this.scale)
        .range([0, width])
        .clamp(true);

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {hue(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(this.ticks))
      .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);
    let self = this /// Clean this up!
    function hue(h) {
      hueTarget = h;
      handle.attr("cx", x(hueTarget));
      self.onSlide(hueTarget) // hueActual is UNIX DATE time
      // hueTimer.restart(hueTween);
    }
    // function hueTween() {
    //   var hueError = hueTarget - hueActual;
    //   if (Math.abs(hueError) < 1e-3) hueActual = hueTarget, hueTimer.stop();
    //   else hueActual += hueError * hueAlpha;
    //
    //   svg.style("background-color", d3.hsl(hueActual, 0.8, 0.8));
    // }
  },

  methods: {
    onSlide(dateVal) {
      let newData = filter(this.siteData, d => {
        return d.date < dateVal
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
