/* References: http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8
              http://dataviscourse.net/2016/lectures/lecture-d3-layouts-maps/
*/

 var w = 800;
 var h = 500;
 var projection = d3.geoAlbersUsa()
         .translate([w / 2, h / 2])
         .scale([700]);

 var path = d3.geoPath()
         .projection(projection);

 var svg = d3.select("body")
         .append("svg")
         .attr("width", w)
         .attr("height", h);

 d3.json("../data/us.json", function (error, json) {
     if (error) return console.log(error)

     svg.append("path")
         .datum(topojson.feature(json, json.objects.land))
         .attr("d", path)
         .attr("class", "land-boundary");
     svg.append("path")
         .datum(topojson.mesh(json, json.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
         .attr("d", path)
         .attr("class", "county-boundary");
     svg.append("path")
         .datum(topojson.mesh(json, json.objects.states, function(a, b) { return a !== b; }))
         .attr("d", path)
         .attr("class", "state-boundary");
     //Load in cities data
     d3.csv("../data/pipe-data.csv", function (data) {
         svg.selectAll("circle")
                 .data(data)
                 .enter()
                 .append("circle")
                 .attr("cx", function (d) {
                     return projection([d.longitude, d.latitude])[0];
                 })
                 .attr("cy", function (d) {
                     return projection([d.longitude, d.latitude])[1];
                 })
                 .attr("r", function (d) {
                     var gallons = parseInt(d.gallons) ?
                                   parseInt(d.gallons) :
                                   10000
                     return Math.sqrt(gallons * 0.0004);
                 })
                 .style("fill", "steelblue")
                 .style("opacity", 0.8);
     });
 });
