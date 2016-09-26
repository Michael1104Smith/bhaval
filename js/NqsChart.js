var NqsChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind, fileName;

    // constructor
    function NqsChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    NqsChart.prototype.draw = function() {
        var id1 = this.id;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var Ind = this.Ind;
        var StartInd = Ind*5 + tabIndex - 1;
        var RectColors = TabColors[tabIndex];
        var StartRect = width/20*7;
        var maxRectWidth = width/20*12;
        var Cnt = NqsStr.length;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");


        d3.csv(fileName, type, function(error, data) {
            if (error) throw error;

            // $(id1).html('');

            var txt = svg.select('.txt');
            var bigrect = svg.select('.bigrect');
            var charts = svg.select('.charts');
            txt.html('');
            charts.html('');

            var val_arr = [];
            var bigrectdata = [];

            val_arr.push(parseInt(data[StartInd].Safety));
            val_arr.push(parseInt(data[StartInd].Prevention_treatment));
            val_arr.push(parseInt(data[StartInd].Communication_cordination));
            val_arr.push(parseInt(data[StartInd].Community_best_practices));
            val_arr.push(parseInt(data[StartInd].Engagement));
            val_arr.push(parseInt(data[StartInd].Affordable));

            var clip_height = height/(Cnt+2);
            var rect_height = clip_height/8*7;
            var margin = clip_height/8;
            var i;
            var max_val = val_arr[0];
            for(i = 1; i < val_arr.length; i++){
              if(max_val < val_arr[i]) max_val = val_arr[i];
            }
            for(i = 0; i < Cnt; i++){
              var y = (rect_height+margin)*i + margin*2;
              var fontSize = rect_height/2;
              var x = StartRect;
              txt.append('text')
                .attr('x',x - margin)
                .attr('y',y+rect_height/4*3)
                .text(NqsStr[i])
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .attr('dy',function(){
                  if(NqsStr[i].length > 18) return '-0.5em';
                  return 0;
                })
                .call(wrap,18);   

              var tmp_data = {};
              tmp_data["x"] = x;
              tmp_data["y"] = y;
              tmp_data["width"] = maxRectWidth/max_val*val_arr[i];
              tmp_data["height"] = rect_height;
              tmp_data["color"] = TabColors[tabIndex];
              bigrectdata.push(tmp_data);

              // bigrect.append('rect')
              //   .transition()
              //   .duration(durationTime)
              //   .ease("quad")
              //   .attr('x',x)
              //   .attr('y',y)
              //   .attr('width',maxRectWidth/max_val*val_arr[i])
              //   .attr('height',rect_height)
              //   .attr('fill',function(){
              //     return TabColors[tabIndex];
              //   });
              txt.append('text')
                .attr('x',maxRectWidth/max_val*val_arr[i]-fontSize/8+x)
                .attr('y',y+rect_height/4*3)
                .text(numberWithCommas(val_arr[i]))
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .style("fill","#fff");
            }
            
            var bars = bigrect.selectAll("rect.bar")
                .data(bigrectdata);
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar");
            bars.exit()
            .transition()
            .duration(durationTime)
            .ease("exp")
                .attr("width", 0)
                .attr("fill","white")
                .remove();
            bars.transition()
            .duration(durationTime)
            .ease("quad")
                .attr("x",function(d){return d["x"];})
                .attr("y",function(d){return d["y"];})
                .attr("fill",function(d){return d["color"]})
                .attr("width",function(d){return d["width"]})
                .attr("height", function(d){return d["height"]});

          // Bottom Featured Buttons
          
            for (i = 0; i < NqsBodyStr.length; i++){
              var btWidth = rect_height * 3;
              var btHeight = rect_height/4*3;
              var fontSize = rect_height/2;
              var btnRectcolor = TabColors[tabIndex];
              if(i != Ind) btnRectcolor = defaultTabColor;
              charts.append('rect')
                .attr('rx',btHeight/5)
                .attr('ry',btHeight/5)
                .attr('x',StartRect - btWidth/2 + (margin+btWidth)*i)
                .attr('y',height - rect_height/2*3)
                .attr('width',btWidth)
                .attr('height',btHeight)
                .attr('fill',btnRectcolor)
                .style('cursor','pointer')
                .on('click',function(){
                  durationTime = constdurationTime;
                  NqsInd = 1 - NqsInd;
                  NqsDrawChart();
                });
              charts.append('text')
                .attr('x',StartRect + (margin+btWidth)*i)
                .attr('y',height - rect_height/2*3 + fontSize/8*9)
                .attr('text-anchor','middle')
                .text(NqsBodyStr[i])
                .style('font-size',rect_height/5*2+"px")
                .style('cursor','pointer')
                .on('click',function(){
                  durationTime = constdurationTime;
                  NqsInd = 1 - NqsInd;
                  NqsDrawChart();
                });;
            }
          });
    }

    function type(d) {
      d.Total = +d.Total;
      return d;
    }

    function wrap(text, length) {
      text.each(function() {

        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            linerequested = 0,
            lineHeight = 0.8, // ems
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

    return NqsChart;
})();