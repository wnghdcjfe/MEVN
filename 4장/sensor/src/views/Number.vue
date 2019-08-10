<template>
  <div class="hello">
    <h2>커져가는 원속의 숫자 + 게이지</h2>
    <svg></svg> 
  </div>
</template>

<script>import ioClient from 'socket.io-client' 
  import * as d3 from 'd3';    
  export default {
    name: 'HelloWorld3',
    data() {
      return { 
      }
    },
    mounted() {
      this.showCircle(); 
      var socket = ioClient('http://127.0.0.1:12010');  
      console.log(socket)
    },
    methods: {
      showCircle() {  
        const width = window.innerWidth - 20;
        const height = window.innerHeight - 20; 
        const radius = Math.min(width, height) / 3;    
        const format = d3.format(".0%");  
        const group = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        const textDOM = group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em");
          
        const arc = d3.arc()
          .innerRadius(radius * 0.7)
          .outerRadius(radius); 
        const pieGenerator = d3.pie().sort(null)
        const background = group.append("path")
          .data(pieGenerator([1])) 
          .attr("class", "backColor") 
          .attr("d", arc)

        const foreground = group.append("path")
          .data(pieGenerator([0, 100])) 
          .attr("class", (d, i) =>`frontColor${i}`) 
          .attr("d", arc)
 

        function arcTween(pie){
          return function(d){ 
            const interpolate  = d3.interpolate(pie[0].startAngle,pie[0].endAngle);
            const interpolateText  = d3.interpolate(0,pie[0].value); 
            return function(t){
              d.endAngle = interpolate(t);
              textDOM.text(format(interpolateText(t) / 100));
              return arc(d);
            }
          } 
        }   
        foreground.transition().duration(1500).attrTween("d", arcTween(pieGenerator([80, 20]))).delay(1000)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  path.backColor {
    fill: #ff9c00;
  }
  path.frontColor0 {
    fill: #545f73;
  }
  path.frontColor1 {
    fill: #ff9c00;
  }  

  text {
    font-size: 7em;
    font-weight: 400;
    line-height: 16em;
    fill: black;
    font-family:오버워치;
  }
  @font-face {
    font-family: 오버워치;
    src: url(../assets/koverwatch.woff2);
  } 

</style>
