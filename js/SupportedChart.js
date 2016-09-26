var SupportedChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind, fileName;

    // constructor
    function SupportedChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    SupportedChart.prototype.draw = function() {
        var id1 = this.id;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var Ind = this.Ind;
        var StartInd = 0;
        var Cnt = 4;
        var RectColors = TabColors[tabIndex];
        var StartRect = width/20*5;
        var maxRectWidth = width/20*15;
        if(Ind == 1) {
          StartInd = 4;
          Cnt = 3;
          RectColors = PrintColors[tabIndex];
        }
        if(Ind == 2) {
          StartInd = 7;
          Cnt = 3;
          RectColors = NonColors[tabIndex];
        }

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");


        d3.csv(fileName, type, function(error, data) {
            if (error) throw error;
            var val_arr = [];
            var val_arr1 = [];
            if(Ind == 0){
              val_arr.push(parseInt(data[0].International));
              val_arr.push(parseInt(data[0].National));
              val_arr.push(parseInt(data[0].Regional));
              val_arr.push(parseInt(data[0].Local));
            }else if(Ind == 1){
              val_arr.push(parseInt(data[0].Journal_Supplement));
              val_arr.push(parseInt(data[0].Direct_Mail));
              val_arr.push(parseInt(data[0].Other));
            }else if(Ind == 2){
              val_arr.push(parseInt(data[0].Live));
              val_arr.push(parseInt(data[0].Archive));
              val_arr.push(parseInt(data[0].Interactive));
            }

            if(tabIndex != 0){
              if(Ind == 0){
                val_arr1.push(parseInt(data[tabIndex].International));
                val_arr1.push(parseInt(data[tabIndex].National));
                val_arr1.push(parseInt(data[tabIndex].Regional));
                val_arr1.push(parseInt(data[tabIndex].Local));
              }else if(Ind == 1){
                val_arr1.push(parseInt(data[tabIndex].Journal_Supplement));
                val_arr1.push(parseInt(data[tabIndex].Direct_Mail));
                val_arr1.push(parseInt(data[tabIndex].Other));
              }else if(Ind == 2){
                val_arr1.push(parseInt(data[tabIndex].Live));
                val_arr1.push(parseInt(data[tabIndex].Archive));
                val_arr1.push(parseInt(data[tabIndex].Interactive));
              }
            }else{
              if(Ind == 0){
                val_arr1.push(0);
                val_arr1.push(0);
                val_arr1.push(0);
                val_arr1.push(0);
              }else if(Ind == 1){
                val_arr1.push(0);
                val_arr1.push(0);
                val_arr1.push(0);
              }else if(Ind == 2){
                val_arr1.push(0);
                val_arr1.push(0);
                val_arr1.push(0);
              }
            }
            var txt = svg.select('.txt');
            var charts = svg.select('.charts');
            var bigrect = svg.select('.bigrect');
            var smallrect = svg.select('.smallrect');
            txt.html('');
            charts.html('');

            var clip_height = height/6;
            var rect_height = clip_height/8*6;
            var margin = clip_height/4;


            // $(id1).html('');
            txt.append('text')
              .attr('x',StartRect)
              .attr('y',rect_height)
              .text(SupportedText[Ind]);
            var i;
            var max_val = val_arr[0];
            if(tabIndex !=0){
              max_val += val_arr1[0];
              for(i = 1; i < val_arr.length; i++){
                if(max_val < val_arr[i]+val_arr1[i]) max_val = val_arr[i]+val_arr1[i];
              }
            }else{
              for(i = 1; i < val_arr.length; i++){
                if(max_val < val_arr[i]) max_val = val_arr[i];
             }
            }

            var smallrectdata = [];
            var bigrectdata = [];

            for(i = 0; i < Cnt; i++){
              var fontSize = 9;
              var y = (rect_height+margin)*(i+1);
              txt.append('text')
                .attr('x',StartRect-width/32)
                .attr('y',y+(rect_height+fontSize)/2)
                .text(SupportedEachText[StartInd+i])
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .attr('dy',0)
                .call(wrap,13);
              var x = StartRect;  
              var tmp_data = {};
              tmp_data["x"] = x;
              tmp_data["y"] = y;
              tmp_data["width"] = maxRectWidth/max_val*val_arr1[i];
              tmp_data["height"] = rect_height;
              tmp_data["color"] = RectColors;
              smallrectdata.push(tmp_data);
              // smallrect.append('rect')
              //   .transition()
              //   .duration(durationTime)
              //   .ease("quad")
              //   .attr('x',x)
              //   .attr('y',y)
              //   .attr('width',maxRectWidth/max_val*val_arr1[i])
              //   .attr('height',rect_height)
              //   .attr('fill',RectColors);
              txt.append('text')
                .attr('x',maxRectWidth/max_val*val_arr1[i]-width/100+x)
                .attr('y',y+(rect_height+fontSize)/2)
                .text(numberWithCommas(val_arr1[i]))
                .attr('text-anchor',function(){
                  if(maxRectWidth/max_val*val_arr1[i]>10) return 'end';
                  return 'middle';
                })
                .attr('font-size',fontSize+'px')
                .style("fill","#fff");
              x += maxRectWidth/max_val*val_arr1[i];

              var tmp_data = {};
              tmp_data["x"] = x;
              tmp_data["y"] = y;
              tmp_data["width"] =maxRectWidth/max_val*val_arr[i];
              tmp_data["height"] = rect_height;
              if(tabIndex == 0) {
                tmp_data["color"] = RectColors;; 
              }else{
                tmp_data["color"] = defaultTabColor; 
              }
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
              //     if(tabIndex == 0) return RectColors;
              //     return defaultTabColor;
              //   });
              txt.append('text')
                .attr('x',maxRectWidth/max_val*val_arr[i]-width/100+x)
                .attr('y',y+(rect_height+fontSize)/2)
                .text(numberWithCommas(val_arr[i]))
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .style("fill","#fff");
            }
            var bars = smallrect.selectAll("rect.bar")
                .data(smallrectdata);
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
            if(Ind != 0){
              y = (rect_height+margin)*(i+1);
              var fontSize = 9;
              if(Ind == 1){
                  charts.append('rect')
                    .attr('rx',2)
                    .attr('ry',2)
                    .attr('x',width/4*3-width/8)
                    .attr('y',y)
                    .attr('width',width/4)
                    .attr('height',rect_height/4*3)
                    .attr('fill',RectColors)
                    .style("cursor","pointer")
                    .on('click',function(){
                      durationTime = constdurationTime;
                      drawPrint();
                    });
                  txt.append('text')
                    .attr('x',width/4*3)
                    .attr('y',y+(rect_height/4*3+fontSize)/2)
                    .text('List')
                    .attr('text-anchor','middle')
                    .attr('font-size',fontSize + 'px')
                    .style("fill","#fff")
                    .style("cursor","pointer")
                    .on('click',function(){
                      durationTime = constdurationTime;
                      drawPrint();
                    });
                }else{
                  charts.append('rect')
                    .attr('rx',2)
                    .attr('ry',2)
                    .attr('x',width/4*3-width/8)
                    .attr('y',y)
                    .attr('width',width/4)
                    .attr('height',rect_height/4*3)
                    .attr('fill',RectColors)
                    .style("cursor","pointer")
                    .on('click',function(){
                      durationTime = constdurationTime;
                      drawWeb();
                    });
                  txt.append('text')
                    .attr('x',width/4*3)
                    .attr('y',y+(rect_height/4*3+fontSize)/2)
                    .text('List')
                    .attr('text-anchor','middle')
                    .attr('font-size',fontSize + 'px')
                    .style("fill","#fff")
                    .style("cursor","pointer")
                    .on('click',function(){
                      durationTime = constdurationTime;
                      drawWeb();
                    });
                }
            }
            if(Ind == 1){
              var fontSize = 11;
              y = (rect_height+margin)*(i+2);
              charts.append('rect')
                .attr('x',width/2)
                .attr('y',y)
                .attr('width',width/12)
                .attr('height',width/12)
                .attr('fill',defaultTabColor);
              txt.append('text')
                .attr('x',width/2+width/8)
                .attr('y',y+(width/12+fontSize)/2)
                .text('Total')
                .attr('font-size',fontSize + 'px');
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

    return SupportedChart;
})();