var FundTaChartApproved = (function() {
    // "private" variables 
    var id, width, height, header_text, fileName, tabIndex,prefix,suffix;

    // constructor
    function FundTaChartApproved() {
        this.dir = -1;
        this.opacity = 1;
        this.prefix = '$';
        this.suffix = 'M';
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundTaChartApproved.prototype.draw = function() {
        // $(this.id).html('');
        var header_text = this.header_text;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/5;
        var tabIndex = this.tabIndex;
        var prefix = this.prefix;
        var suffix = this.suffix;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.Value; 
            });

        var svg = d3.select(this.id)
            .attr("width", width-width/4)
            .attr("height", height);

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;

          var txt = svg.select('.txt');
          var charts = svg.select('.charts');
          txt.attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");
          charts.attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");
          
          txt.html('');
          var fontSize = radius / 3;

          txt.append("text")
            .attr("x","0")
            .attr("y",-radius-5)
            .attr('text-anchor','middle')
           .text(header_text)
           .style("font-size",fontSize+"px");

          var txt_val = txt.selectAll(".txt_val")
              .data(pie(data));

          txt_val.enter().append("g")
              .attr("class", "txt_val");

          txt_val.append("text")
              .attr('text-anchor','middle')
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .style('font-size',(fontSize)+'px')
              .text(function(d) { 
                return numberWithCommas(d.data.Value);
            });

          var useData;
          if(prevFundTaDataApproved == 0){
              useData = data; 
            }else{
              useData = prevFundTaDataApproved;
            }

          var path = charts.datum(useData)
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class","piechart")
            .style("fill", function(d) {
              return AudienceColors[tabIndex][d.data.Number];
            })
            .attr("d", arc)
            .each(function(d){ this._current = d; }); 
            // add transition to new path
            charts.datum(data).selectAll("path")
              .data(pie)
              .transition()
              .attrTween("d", arcTween)            
              .style("fill", function(d) {
                return AudienceColors[tabIndex][d.data.Number];
              })
              .attr("d", arc);

            prevFundTaDataApproved = data;   

          function arcTween(a) {
              console.log(a);
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) {
                return arc(i(t));
              };
          }
        });
    };

    function type(d) {
      d.Value = +d.Value;
      return d;
    }

    function wrap(text, length) {
      text.each(function() {

        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            linerequested = 0,
            lineHeight = 1.2, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            transform = text.attr("transform"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.html().length > length) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                      .attr("x", x)
                      .attr("y", y)
                      .attr("dx", "0")
                      .attr("dy", lineHeight + dy + "em")
                      .text(word);
          }
        }
      });
    }
    return FundTaChartApproved;
})();