var FundSupportedChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind, fileName;

    // constructor
    function FundSupportedChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundSupportedChart.prototype.draw = function() {
        var id1 = this.id;
        var fileName = this.fileName;
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var Ind = this.Ind;
        var StartInd = 0;
        var RectColors = TabColors[tabIndex];
        var StartRect = width/20*8;
        var maxRectWidth = width/20*11;
        var Cnt = FundSupportedStr.length;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");


        d3.csv(fileName, type, function(error, data) {
            if (error) throw error;

            // $(id1).html('');
            var txt = svg.select('.txt');
            var bigrect = svg.select('.bigrect');
            var smallrect = svg.select('.smallrect');
            var charts = svg.select('.charts');
            txt.html('');
            charts.html('');

            var val_arr = [];
            var tmp_tabIndex = tabIndex;
            tabIndex = 0;

            var smallrectdata = [];
            var bigrectdata = [];

            val_arr.push(parseInt(data[tabIndex].Hospitals));
            val_arr.push(parseInt(data[tabIndex].Academic));
            val_arr.push(parseInt(data[tabIndex].MECCs));
            val_arr.push(parseInt(data[tabIndex].Societies));
            val_arr.push(parseInt(data[tabIndex].Accredited_Organizations));
            val_arr.push(parseInt(data[tabIndex].Foundations));
            val_arr.push(parseInt(data[tabIndex].National_Regional_Associations));
            val_arr.push(parseInt(data[tabIndex].Other));

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
                .text(FundSupportedStr[i])
                .attr('text-anchor','end')
                .attr('font-size',fontSize+'px')
                .attr('dy',0);

              var tmp_data = {};
              tmp_data["x"] = x;
              tmp_data["y"] = y;
              tmp_data["width"] = maxRectWidth/max_val*val_arr[i];
              tmp_data["height"] = rect_height;
              if(tmp_tabIndex == 0) {
                tmp_data["color"] = GrantColors[tabIndex][i];; 
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
              //     if(tmp_tabIndex == 0) return GrantColors[tabIndex][i];
              //     return defaultTabColor;
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
            tabIndex = tmp_tabIndex;
              var val_arr = [];
            if(tabIndex != 0){
              val_arr.push(parseInt(data[tabIndex].Hospitals));
              val_arr.push(parseInt(data[tabIndex].Academic));
              val_arr.push(parseInt(data[tabIndex].MECCs));
              val_arr.push(parseInt(data[tabIndex].Societies));
              val_arr.push(parseInt(data[tabIndex].Accredited_Organizations));
              val_arr.push(parseInt(data[tabIndex].Foundations));
              val_arr.push(parseInt(data[tabIndex].National_Regional_Associations));
              val_arr.push(parseInt(data[tabIndex].Other));
            }else{
              for(i = 0; i < 8; i++){
                val_arr.push(0);
              }
            }
            for(i = 0; i < Cnt; i++){
              var y = (rect_height+margin)*i + margin*2;
              var fontSize = rect_height/2;
              var x = StartRect;
              var width = maxRectWidth/max_val*val_arr[i];

              var tmp_data = {};
              tmp_data["x"] = x;
              tmp_data["y"] = y;
              tmp_data["width"] = width;
              tmp_data["height"] = rect_height;
              tmp_data["color"] = GrantColors[tabIndex][i];
              smallrectdata.push(tmp_data);

              // smallrect.append('rect')
              //   .transition()
              //   .duration(durationTime)
              //   .ease("quad")
              //   .attr('x',x)
              //   .attr('y',y)
              //   .attr('width',width)
              //   .attr('height',rect_height)
              //   .attr('fill',function(){
              //     return GrantColors[tabIndex][i];
              //   });
              txt.append('text')
                .attr('x',width-fontSize/8+x)
                .attr('y',y+rect_height/4*3)
                .text(function(){
                  if(val_arr[i] == 0) return '';
                  return numberWithCommas(val_arr[i]);
                })
                .attr('text-anchor',function(){
                  if(width < fontSize) return 'middle';
                  return 'end';
                })
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

          // Bottom Featured Buttons
            if(tabIndex != 0){
              var btWidth = rect_height * 3;
              var btHeight = rect_height/4*3;
              var fontSize = rect_height/2;
              var btnRectcolor = TabColors[tabIndex];
              if(i != 0) btnRectcolor = defaultTabColor;
              charts.append('rect')
                .attr('x',StartRect)
                .attr('y',height - rect_height/2*3)
                .attr('width',btHeight)
                .attr('height',btHeight)
                .attr('fill',btnRectcolor);
              charts.append('text')
                .attr('x',StartRect + btHeight + margin)
                .attr('y',height - rect_height/2*3 + fontSize/8*9)
                .text('Total')
                .style('font-size',rect_height/2+"px");
            }
          });
    }

    function type(d) {
      d.Total = +d.Total;
      return d;
    }

    return FundSupportedChart;
})();