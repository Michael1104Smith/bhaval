var MapChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind;

    // constructor
    function MapChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    MapChart.prototype.draw = function() {
        var fileName = this.fileName;
        var tabIndex = this.tabIndex;
        var marginTop = width/18;
        $(this.id).html('');
        var width = this.width, height = this.height;
        var projection = d3.geo.albersUsa()
            .scale(width)
            .translate([width / 2, height / 2]);

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height);

        var path = d3.geo.path()
            .projection(projection);

        var g = svg.append("g");

        // load and display the World
        d3.json("data/us.json", function(error, topology) {

          // load and display the cities
          d3.csv("data/cities.csv", function(error, data) {
              // g.selectAll("circle")
              //    .data(data)
              //    .enter()
              //    .append("a")
              //       .attr("xlink:href", function(d) {
              //         return "https://www.google.com/search?q="+d.city;}
              //       )
              //    .append("circle")
              //    .attr("cx", function(d) {
              //            return projection([d.lon, d.lat])[0];
              //    })
              //    .attr("cy", function(d) {
              //            return projection([d.lon, d.lat])[1];
              //    })
              //    .attr("r", 5)
              //    .style("fill", "red");
          });


          g.selectAll("path")
                .data(topojson.object(topology, topology.objects.states)
                    .geometries)
              .enter()
                .append("path")
                .attr("d", path)
                .style("fill",defaultTabColor);
        });

        // zoom and pan
        var zoom = d3.behavior.zoom()
            .on("zoom",function() {
                g.attr("transform","translate("+ 
                    d3.event.translate.join(",")+")scale("+d3.event.scale+")");
                g.selectAll("circle")
                    .attr("d", path.projection(projection));
                g.selectAll("path")  
                    .attr("d", path.projection(projection)); 

          });

        svg.call(zoom);
    }

    return MapChart;
})();