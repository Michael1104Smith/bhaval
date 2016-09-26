var FundRight = (function() {
    // "private" variables 
    var id, width, height, tabIndex, ind;

    // constructor
    function FundRight() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    FundRight.prototype.draw = function() {
        $(this.id).html('');
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var marginTop = width/18;
        var ind = this.ind;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");

        if(tabIndex == 0){
          var fontSize = 13;
          var rect_height = width/6;
          svg.append('rect')
            .attr('rx',3)
            .attr('ry',3)
            .attr('x',width/8)
            .attr('y',height/2 - rect_height*2 - marginTop)
            .attr('width',width/8*6)
            .attr('height',rect_height)
            .attr('fill',function(){
              if(ind == 0) return TabColors[0];
              return defaultTabColor;
            })
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 0){
                  FundRightInd = 0;
                  DrawFundRight();
                  DrawFundChart();
              }
            });
          svg.append('text')
            .attr('x',width/2)
            .attr('y',height/2 - rect_height*2 - marginTop + 13 + (rect_height-fontSize)/2)
            .text('All')
            .attr('text-anchor','middle')
            .style('fill','#fff')
            .attr('font-size',fontSize+'px')
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 0){
                  FundRightInd = 0;
                  DrawFundRight();
                  DrawFundChart();
              }
            });

          svg.append('rect')
            .attr('rx',3)
            .attr('ry',3)
            .attr('x',width/8)
            .attr('y',height/2- rect_height)
            .attr('width',width/8*6)
            .attr('height',rect_height)
            .attr('fill',function(){
              if(ind == 1) return TabColors[0];
              return defaultTabColor;
            })
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 1){
                  FundRightInd = 1;
                  DrawFundRight();
                  DrawFundChart();
              }
            });
          svg.append('text')
            .attr('x',width/2)
            .attr('y',height/2 - rect_height + 13 + (rect_height-fontSize)/2)
            .text('CGN')
            .attr('text-anchor','middle')
            .style('fill','#fff')
            .attr('font-size',fontSize+'px')
            .style('cursor','pointer')
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 1){
                  FundRightInd = 1;
                  DrawFundRight();
                  DrawFundChart();
              }
            });

          svg.append('rect')
            .attr('rx',3)
            .attr('ry',3)
            .attr('x',width/8)
            .attr('y',height/2 + marginTop)
            .attr('width',width/8*6)
            .attr('height',rect_height)
            .attr('fill',function(){
              if(ind == 2) return TabColors[0];
              return defaultTabColor;
            })
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 2){
                  FundRightInd = 2;
                  DrawFundRight();
                  DrawFundChart();
              }
            });
          svg.append('text')
            .attr('x',width/2)
            .attr('y',height/2 + marginTop + 13 + (rect_height-fontSize)/2)
            .text('Non Solicited')
            .attr('text-anchor','middle')
            .style('fill','#fff')
            .attr('font-size',fontSize+'px')
            .style('cursor','pointer')
            .on('click',function(){
              durationTime = constdurationTime;
              if(FundRightInd != 2){
                  FundRightInd = 2;
                  DrawFundRight();
                  DrawFundChart();
              }
            });
          }else{
            var r = width/16;
            svg.append('circle')
              .attr('cx',width/8)
              .attr('cy',height/2 - marginTop*2)
              .attr('r',r)
              .attr('fill',TabColors[tabIndex]);
            svg.append('text')
              .attr('x',width/8 + marginTop*2)
              .attr('y',height/2 - marginTop*2 + 4)
              .text('CGN')
              .attr('font-size','13px');

            svg.append('circle')
              .attr('cx',width/8)
              .attr('cy',height/2 + marginTop*2)
              .attr('r',r)
              .attr('fill',NonColors[tabIndex]);
            svg.append('text')
              .attr('x',width/8 + marginTop*2)
              .attr('y',height/2 + marginTop*2 + 4)
              .text('Non Solicited')
              .attr('font-size','13px');
          }
    };
    return FundRight;
})();