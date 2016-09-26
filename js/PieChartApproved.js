var PieChartApproved = (function() {
    // "private" variables 
    var id, width, height, header_text, fileName, tabIndex;

    // constructor
    function PieChartApproved() {
        this.dir = -1;
        this.opacity = 1;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    PieChartApproved.prototype.draw = function() {
        // $(this.id).html('');
        var id1 = this.id;
        var header_text = this.header_text;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var radius = height/3;
        var tabIndex = this.tabIndex;

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var labelArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                if(header_text == "Requested") return d.Requested; 
                return d.Approved;
            });

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height);

        d3.csv(fileName, type, function(error, data) {
          if (error) throw error;
          var total = 0;
          for(i = 0 ; i < data.length; i++){
            if(header_text == "Requested") total += parseInt(data[i].Requested); 
            else total += parseInt(data[i].Approved);
          }
          total = "Total "+ total;

          var txt = svg.select('.txt');
          var charts = svg.select('.charts');

          txt.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
          charts.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          txt.html('');
          txt.append("text")
            .attr("x",0)
            .attr("y",0)
           .text(numberWithCommas(total))
           .style("font-size","15px")
           .attr("dy","-0.3")
           .attr("text-anchor","middle")
           .call(wrap, 5);

          txt.append("text")
            .attr("x","0")
            .attr("y",-radius-5)
           .text(header_text)
           .attr("text-anchor","middle")
           .style("font-size","12px");

          var txt_val = txt.selectAll(".txt_val")
              .data(pie(data));

          txt_val.enter().append("g")
              .attr("class", "txt_val");

          txt_val.append("text")
              .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style('fill',"#fff")
              .attr("text-anchor","middle")
              .text(function(d) { 
                if(header_text == "Requested") return d.data.Requested;
                return d.data.Approved;
            });

          var useData;
          if(prevPieDataApproved == 0){
              useData = data; 
            }else{
              useData = prevPieDataApproved;
            }


          var path = charts.datum(useData)
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("class","PieChartApproved")
            .style("fill", function(d) { 
                if(tabIndex == 0) return TabColors[d.data.Number];
                if(d.data.Number == tabIndex) return TabColors[tabIndex];
                return defaultTabColor;
            })
            .attr("d", arc)
            .each(function(d){ this._current = d; }); 
            // add transition to new path
            charts.datum(data).selectAll("path")
              .data(pie)
              .transition()
              .attrTween("d", arcTween)
              .style("fill", function(d) { 
                if(tabIndex == 0) return TabColors[d.data.Number];
                if(d.data.Number == tabIndex) return TabColors[tabIndex];
                return defaultTabColor;
              })
              .attr("d", arc);

            prevPieDataApproved = data;   

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
      if(header_text == "Requested") d.Requested = +d.Requested;
      else d.Approved = +d.Approved;
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
    return PieChartApproved;
})();