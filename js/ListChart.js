var ListChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex;

    // constructor
    function ListChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    ListChart.prototype.draw = function() {
        $(this.id).html('');
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var startY = height/30;
        var startX = width/30;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");
        var r = height/(listStr.length*3);
        var fontSize = r/2*3;
        var marginTop = r/2;
        var i;
        for(i = 0; i < listStr.length; i++){
          svg.append('circle')
            .attr('cx',startX)
            .attr('cy',startY + (marginTop+r)*i*2)
            .attr('r',r)
            .attr('fill',TabColors[tabIndex]);
          svg.append('text')
            .attr('x',startX + r*2)
            .attr('y',startY + (marginTop+r)*i*2+r*2-fontSize/2)
            .text(listStr[i])
            .attr('font-size',fontSize+'px')
            .attr('dy','-0.5em');
        }
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
    return ListChart;
})();