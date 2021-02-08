<template>
  <div class="Number card">
    <svg></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  export default {
    name: 'Number',
    data() {
      return {}
    },
    mounted() {
      this.showCircle();
    },
    methods: {
      showCircle() {
        const width = 500 - 20; // --- (1)
        const height = 600 - 20;
        const radius = Math.min(width, height) / 3;
        const group = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pieGenerator = d3.pie().sort(null) // --- (2)
        const arc = d3.arc()
          .innerRadius(radius * 0.7)
          .outerRadius(radius);

        const textDOM = group.append("text") // --- (3)
          .attr("text-anchor", "middle")
          .attr("dy", ".3em");  

        const background = group.append("path")  
          .data(pieGenerator([1]))
          .attr("class", "backColor")
          .attr("d", arc)

        const foreground = group.append("path")  
          .data(pieGenerator([0, 100]))
          .attr("class", (d, i) => `frontColor${i}`)
          .attr("d", arc)

        const format = d3.format(".0%"); // --- (3)
        function arcTween(pie) { // --- (4)
          return function (d) {
            const interpolate = d3.interpolate(pie[0].startAngle, pie[0].endAngle);
            const interpolateText = d3.interpolate(0, pie[0].value);
            return function (t) {
              d.endAngle = interpolate(t);
              textDOM.text(format(interpolateText(t) / 100));
              return arc(d);
            }
          }
        }
        // --- (5)
        foreground.transition().duration(1500).attrTween("d", arcTween(pieGenerator([80, 20]))).delay(1000) // --- (7)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Number path.backColor {
    fill: #ff9c00;
  }

  .Number path.frontColor0 {
    fill: #545f73;
  }

  .Number path.frontColor1 {
    fill: #ff9c00;
  }

  .Number text {
    font-size: 5em;
    font-weight: 400;
    line-height: 16em;
    fill: black;
    font-family: 오버워치;
  }
</style>