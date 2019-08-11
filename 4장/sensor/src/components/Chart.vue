<template>
  <div class="Chart">

  </div>
</template>

<script>
  import config from '../config'
  import * as d3 from 'd3';
  export default {
    name: 'Chart',
    props: {
      _key: Number,
      color: String
    },
    data() {
      return {
        drawSensor: []
      }
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        //if (this.sensors.length < 10) return;
        const xScale = d3.scaleTime().range([0, config.chartWidth])
        const yScale = d3.scaleLinear().range([0, config.chartHeight])

        const line = d3.line().x((d, i) => xScale(i)).y(d => yScale(d.y)).curve(d3.curveMonotoneX)
        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        const dataset = d3.range(n).map(d => {
          "y": d3.randomUniform(1)
        })


        // 1. Add the SVG to the page and employ #2
        const svg = d3.select("body").append("svg")
          .attr("width", config.chartWidth + config.margin.left + config.margin.right)
          .attr("height", config.chartHeight + config.margin.top + config.margin.bottom)
          .append("g")
          .attr("transform", `translate(${config,margin.left},${config.margin.top})`);

        // 3. Call the x axis in a group tag
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale));

        svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale));

        svg.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

        svg.selectAll(".dot")
          .data(dataset)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", (d, i) => xScale(i))
          .attr("cy", (d) => yScale(d.y))
          .attr("r", 5).on("mouseover", function (a, b, c) {
            console.log(a, b, c)
            this.attr('class', 'focus')
          })

      },
      computed: {
        ...mapState([
          'sensors'
        ])
      }
    }
</script>

<style>
  .Chart {}
</style>