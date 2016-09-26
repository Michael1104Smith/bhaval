var LearnersChart = (function() {
    // "private" variables 
    var id, width, height, tabIndex, Ind, fileName;

    // constructor
    function LearnersChart() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    LearnersChart.prototype.draw = function() {
        var fileName = this.fileName;
        var tabIndex = this.tabIndex;
        var marginTop = width/18;
        var centered;
        $(this.id).html('');
        var width = this.width, height = this.height;
        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height);
        var projection = d3.geo.albersUsa()
            .scale(width)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height)
            .on("click", clicked);


        var r = height/64;
        var i;
        for(i = 0; i < 6; i++){
          var x = width/7*6;
          var y = height/2 + r*3*i;
          var str;
          if(i == 0){
            str = '>' + stateIdValues[i];
          }else if(i == 5){
            str = '<' + (stateIdValues[i-1] - 1);
          }else{
            str = stateIdValues[i]+'-'+(stateIdValues[i-1]-1);
          }
          svg.append('circle')
            .attr('cx',x)
            .attr('cy',y)
            .attr('r',r)
            .attr('fill',AudienceColors[tabIndex][i]);
          svg.append('text')
            .attr('x',x + r*2)
            .attr('y',y + r/4*3)
            .text(str)
            .attr('font-size',(r*2)+'px');
        }

        var g = svg.append("g");

        d3.json("data/us.json", function(error, us) {
          if (error) throw error;

          d3.csv(fileName,function(error1,data){
            if(error1) throw error1;
            var stateName = [], stateValue = [];
            var i;
            for(i = 0; i < data.length; i++){
              var str = data[i].US_State;
              var arr = str.split(',');
              stateName.push(arr[0]);
              stateValue.push(parseInt(data[i].Value));
            }

            var learnermap = g.selectAll("path.learnermap")
              .attr("id", "states")
              .data(topojson.object(us, us.objects.states)
                  .geometries);
            learnermap.enter()
              .append("svg:path")
              .attr("class", "learnermap");

            learnermap.exit()
            .transition()
            .duration(durationTime)
            .ease("exp")
                .attr("width", 0)
                .attr("fill","white")
                .remove();

            learnermap.transition()
              .duration(durationTime)
              .ease("quad")
              .attr("d", path)
              .style("fill",function(d){
                var i;
                for(i = 0; i < stateName.length; i++){
                  if(stateName[i] == d.properties.name){
                    break;
                  }
                }
                if(stateValue[i] > stateIdValues[0]){
                  return AudienceColors[tabIndex][0];
                }else if(stateValue[i] > stateIdValues[1]){
                  return AudienceColors[tabIndex][1];
                }else if(stateValue[i] > stateIdValues[2]){
                  return AudienceColors[tabIndex][2];
                }else if(stateValue[i] > stateIdValues[3]){
                  return AudienceColors[tabIndex][3];
                }else if(stateValue[i] > stateIdValues[4]){
                  return AudienceColors[tabIndex][4];
                }else{
                  return AudienceColors[tabIndex][5];
                }
              });

            // g.append("g")
            //     .attr("id", "states")
            //   .selectAll("path")
            //     .data(topojson.object(us, us.objects.states)
            //         .geometries)
            //   .enter().append("path")
            //     .attr("d", path)
            //     .on("click", clicked)
            //     .attr("stroke","#000")
            //     .style("fill",function(d){
            //       var i;
            //       for(i = 0; i < stateName.length; i++){
            //         if(stateName[i] == d.properties.name){
            //           break;
            //         }
            //       }
            //       if(stateValue[i] > stateIdValues[0]){
            //         return AudienceColors[tabIndex][0];
            //       }else if(stateValue[i] > stateIdValues[1]){
            //         return AudienceColors[tabIndex][1];
            //       }else if(stateValue[i] > stateIdValues[2]){
            //         return AudienceColors[tabIndex][2];
            //       }else if(stateValue[i] > stateIdValues[3]){
            //         return AudienceColors[tabIndex][3];
            //       }else if(stateValue[i] > stateIdValues[4]){
            //         return AudienceColors[tabIndex][4];
            //       }else{
            //         return AudienceColors[tabIndex][5];
            //       }
            //     });

            // g.append("path")
            //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            //     .attr("id", "state-borders")
            //     .attr("d", path);
          });
        });
        function clicked(d) {
          var x, y, k;

          if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
          } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
          }

          g.selectAll("path")
              .classed("active", centered && function(d) { return d === centered; });

          g.transition()
              .duration(750)
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1 / k + "px");
        }
    }

    function type(d) {
      d.Total = +d.Total;
      return d;
    }

    return LearnersChart;
})();