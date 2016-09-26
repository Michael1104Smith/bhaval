var SupportedLeft = (function() {
    // "private" variables 
    var id, width, height, tabIndex;

    // constructor
    function SupportedLeft() {
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    SupportedLeft.prototype.draw = function() {
        $(this.id).html('');
        var width = this.width, height = this.height;
        var tabIndex = this.tabIndex;
        var marginTop = width/18;

        var svg = d3.select(this.id)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + 0 + "," + 0 + ")");

        var clip_height = height/6;
        var rect_height = clip_height/8*6;
        width = rect_height/2*3;
        var m_height = rect_height/5*4;
        var margin = clip_height/4;
        var fontSize = 13;
        svg.append('rect')
          .attr('rx',fontSize/3)
          .attr('ry',fontSize/3)
          .attr('x',this.width-width)
          .attr('y',(rect_height+margin)*(0+1)+(rect_height-m_height)/2)
          .attr('width',width)
          .attr('height',m_height)
          .attr('fill',TabColors[tabIndex])
          .style('cursor','pointer')
          .on('click',function(){
            durationTime = constdurationTime;
            drawWorldMap();
          });
        svg.append('text')
          .attr('x',this.width-width/2)
          .attr('y',(rect_height+margin)*(0+1)+(rect_height-m_height)/2 + (m_height+fontSize)/2)
          .text('Map')
          .attr('text-anchor','middle')
          .style('fill','#fff')
          .attr('font-size',fontSize + 'px')
          .style('cursor','pointer')
          .on('click',function(){
            durationTime = constdurationTime;
            drawWorldMap();
          });

        svg.append('rect')
          .attr('rx',fontSize/3)
          .attr('ry',fontSize/3)
          .attr('x',this.width-width)
          .attr('y',(rect_height+margin)*(1+1)+(rect_height-m_height)/2)
          .attr('width',width)
          .attr('height',m_height)
          .attr('fill',TabColors[tabIndex])
          .style('cursor','pointer')
          .on('click',function(){
              durationTime = constdurationTime;
              drawUsMap();
          });
        svg.append('text')
          .attr('x',this.width-width/2)
          .attr('y',(rect_height+margin)*(1+1)+(rect_height-m_height)/2 + (m_height+fontSize)/2)
          .text('Map')
          .attr('text-anchor','middle')
          .style('fill','#fff')
          .attr('font-size',fontSize+'px')
          .style('cursor','pointer')
          .on('click',function(){
              durationTime = constdurationTime;
              drawUsMap();
          });
    };
    return SupportedLeft;
})();