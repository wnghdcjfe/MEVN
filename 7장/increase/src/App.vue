<template>
  <div class="Number card">
    <svg></svg>
  </div>
</template>

<script>
  import {
    onMounted
  } from 'vue'
  import * as d3 from 'd3'
  export default {
    name: 'App',
    components: {

    },
    setup() {
      const draw = () => {
        const width = 500 - 20
        const height = 600 - 20
        const radius = Math.min(width, height) / 3
        const tOption = `translate(${width/2},${height/2})`
        const group = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", tOption)

        const pieGenerator = d3.pie().sort(null)
        const arc = d3.arc()
          .innerRadius(radius * 0.8)
          .outerRadius(radius)

        const textDOM = group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")

        group.append("path")
          .data(pieGenerator([1]))
          .attr("class", "backColor")
          .attr("d", arc)

        const foreground = group.append("path")
          .data(pieGenerator([0, 100]))
          .attr("class", (d, i) => `frontColor${i}`)
          .attr("d", arc)

        const format = d3.format(".0%")

        function arcTween(pie) {
          return function (d) {
            const start = pie[0].startAngle
            const end = pie[0].endAngle
            const value = pie[0].value
            const interpolate = d3.interpolate(start, end)
            const interpolateText = d3.interpolate(0, value)
            return function (t) {
              d.endAngle = interpolate(t)
              textDOM.text(format(interpolateText(t) / 100))
              return arc(d)
            }
          }
        }

        foreground.transition()
          .duration(1500)
          .attrTween("d", arcTween(pieGenerator([80, 20])))
          .delay(1000)

      }
      onMounted(() => {
        draw()
      })
      return {
        draw
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: overwatch;
    src: url(https://us.battle.net/forums/static/fonts/f014015d/f014015d.woff);
  }

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
    font-family: 'overwatch', sans-serif;
  }
</style>