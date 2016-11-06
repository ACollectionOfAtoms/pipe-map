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

 d3.json("../data/us.json", function (json) {

     svg.selectAll("path")
             .data(json.features)
             .enter()
             .append("path")
             .attr("d", path);
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
