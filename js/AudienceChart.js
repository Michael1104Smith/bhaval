var AudienceChart = (function() {
    // "private" variables 
    var id, width, height, fileName, tabIndex;

    // constructor
    function AudienceChart() {
        this.dir = -1;
        this.opacity = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    AudienceChart.prototype.draw = function() {
        // $(this.id).html('');
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/7*2;
        var tabIndex = this.tabIndex;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var manArc = d3.svg.arc()
            .outerRadius(radius/2*3)
            .innerRadius(radius);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.Value;
            });

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height);

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;
          var total = 0;
          console.log(data);
          if(tabIndex == 0){
            var tmp_obj = {Number:4,Name:'',Value:0};
            data.push(tmp_obj);
            var tmp_obj = {Number:5,Name:'',Value:0};
            data.push(tmp_obj);
          }
          for(i = 0 ; i < data.length; i++){
            total += parseInt(data[i].Value);
          }
          total = "Total "+ total;

          var txt = svg.select('.txt');
          var charts = svg.select('.charts');

          txt.attr("transform", "translate(" + height / 2+ "," + height / 12 * 5 + ")");
          charts.attr("transform", "translate(" + height / 2+ "," + height / 12 * 5 + ")");

          txt.html('');
          txt.append("text")
            .attr("x",0)
            .attr("y",0)
           .text(numberWithCommas(total))
           .style("font-size","15px")
           .attr("dy","-0.3")
           .attr("text-anchor","middle")
           .call(wrap, 5);

          var txt_val = txt.selectAll(".txt_val")
              .data(pie(data));

          txt_val.enter().append("g")
              .attr("class", "txt_val");

          txt_val.append("text")
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .attr('text-anchor','middle')
              .attr('font-size',radius/6)
              .text(function(d) { 
                if(d.data.Value == 0) return '';
                return numberWithCommas(d.data.Value);
            });

          txt_val.append("text")
              .attr("transform", function(d) { return "translate(" + manArc.centroid(d) + ")"; })
              .style("font-size","7px")
              .attr('text-anchor','middle')
              .attr("x",function(d){
                  if (d.data.Name == 'MD Specialist 2') return 13;
                  return 0;
              })
              .text(function(d) { 
                return d.data.Name;
              });

          var useData;
          if(prevAudienceData == 0){
              useData = data; 
            }else{
              useData = prevAudienceData;
            }


          var path = charts.datum(useData)
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class","PieChartApproved")
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

            prevAudienceData = data;   

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
    return AudienceChart;
})();