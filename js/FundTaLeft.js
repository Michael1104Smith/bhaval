var FundTaLeft = (function() {
    // "private" variables 
    var id, width, height, tabIndex;

    // constructor
    function FundTaLeft() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundTaLeft.prototype.draw = function() {
        $(this.id).html('');
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var marginTop = height/25;
        var startY = height/4;
        var startX = width/8;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");
        var fontSize = height/14;
        svg.append('text')
          .attr('x',startX)
          .attr('y',startY)
          .text('Objectives')
          .attr('font-size',fontSize);
        var r = width/32;
        var i;
        for(i = 0; i < 5; i++){
          svg.append('circle')
            .attr('cx',startX)
            .attr('cy',startY + (marginTop+r)*i*2+marginTop*2)
            .attr('r',r)
            .attr('fill',AudienceColors[tabIndex][i]);
          svg.append('text')
            .attr('x',startX + r*2)
            .attr('y',startY + (marginTop+r)*i*2+marginTop*2+r)
            .text(ObjectStr[i])
            .attr('font-size',(r*3)+'px')
            .attr('dy','-0.5em')
            .call(wrap,20);
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
    return FundTaLeft;
})();