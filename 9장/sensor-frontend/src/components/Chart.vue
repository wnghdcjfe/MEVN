<template>
  <div :class="`Chart Chart-${chartkey}`">
  </div>
</template>

<script>
  import {
    margin,
    chartWidth,
    chartHeight
  } from '../config'
  import store from '../store'
  import * as d3 from 'd3'
  import {
    onMounted,
    computed,
    ref
  } from 'vue'
  const margin_value = 1
  const keyToHanguel = {
    "wv": "풍속",
    "temp": "온도",
    "humi": "습도"
  }
  const timeFormat = d3.timeFormat("%H:%M")
  export default {
    name: 'Chart',
    props: {
      value: String,
      color: String
    },
    setup(props) {

      const value = computed(() => props.value)
      const chartkey = ref(value)
      const sensors = computed(() => store.getters['sensors'])
      //const color = computed(() => props.color)
      let svg, xScale, yScale, xAxis, yAxis, line, tooltip, circle

      const setAreaAndScale = (key) => {
        svg = d3.select(`.Chart-${key}`).append("svg")
          .attr("width", chartWidth + margin.left + margin.right)
          .attr("height", chartHeight + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)

        xScale = d3.scaleTime().range([0, chartWidth])
        yScale = d3.scaleLinear().range([chartHeight, 0])

        xAxis = d3.axisBottom(xScale).tickFormat(timeFormat)
        yAxis = d3.axisLeft(yScale)
        line = d3.line().x(d => {
          return xScale(d.time)
        }).y(d => {
          return yScale(d[key])
        }).curve(d3.curveMonotoneX)

        tooltip = d3.select(`.tooltip`)
      }
      const initDraw = (data, key) => {
        //data는 string형태로 오기 때문에 여기서 new Date 객체로 바꿔주어야 합니다. 
        data.forEach(d => d.time = new Date(d.time))
        //scale에는 extent또는 0부터 max까지 할 수있다. 
        xScale.domain(d3.extent(data, d => d.time))
        //yScale.domain([0, d3.max(data, d => d.temp)])  
        const mn = d3.min(data, d => d[key])
        const mx = d3.max(data, d => d[key])
        yScale.domain([mn - margin_value, mx + margin_value])

        //data를 통해 path를 그리는데 3가지 방법이 있다. 
        // svg.append("path").datum(data).attr("d", line)
        // svg.append("path").data([data]).attr("d", line)  
        svg.append("path")
          .attr("d", line(data))
          .attr("class", "line")
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(xAxis)
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

        circle = svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 5)
          .on("mouseover", (d, event) => {
            tooltip.transition()
              .duration(200)
              .style("opacity", 1)
            const content = `<p>${keyToHanguel[key]}</p> <p>[${timeFormat(d.time)}]</p><h2>${d[key]}</h2>`

            tooltip
              .html(content)
              .style("left", (event.pageX) - 83 + "px")
              .style("top", (event.pageY) - 130 + "px")
          })
          .on("mouseout", () => {
            tooltip.transition()
              .duration(200)
              .style("opacity", 0)
          })

        circle
          .attr("cx", d => xScale(d.time))
          .attr("cy", d => yScale(d[key]))
      }
      //draw에서는 데이터 처리가 아닌 data를 통해서 차트틀 그리는 것에 대해 집중해야 한다. 
      const draw = (data, key) => {
        data.forEach(d => d.time = new Date(d.time))

        const mn = d3.min(data, d => d[key])
        const mx = d3.max(data, d => d[key])
        xScale.domain(d3.extent(data, d => d.time))
        yScale.domain([mn - margin_value, mx + margin_value])
        svg.select(".line")
          .transition()
          .duration(750)
          .attr("d", line(data))
        svg.select(".x.axis")
          .transition()
          .duration(750)
          .call(xAxis)
        svg.select(".y.axis")
          .transition()
          .duration(750)
          .call(yAxis)

        circle
          .data(data)
          .transition()
          .duration(750)
          .attr("cx", d => xScale(d.time))
          .attr("cy", d => yScale(d[key]))
      }
      onMounted(() => {
        setAreaAndScale(chartkey.value)
        let cnt = 0
        store.subscribe((mutation) => {
          if (mutation.type === "CHANGE_SENSOR_CHART") {
            if (!cnt) {
              initDraw(sensors.value, value.value)
            } else {
              draw(sensors.value, value.value)
            }

            cnt = 1
          }

        })
      })
      return {
        sensors,
        chartkey,
        svg,
        xScale,
        yScale,
        xAxis,
        yAxis,
        line,
        tooltip,
        circle
      }
    }
  }
</script>

<style>
  .Chart {
    position: relative
  }

  .Chart .line {
    fill: none;
    stroke: #f89e35;
    stroke-width: 2px;
  }

  .Chart-humi .line {
    stroke: #42b983
  }

  .Chart-wv .line {
    stroke: #262d3d
  }

  circle {
    fill: rgba(40, 53, 79, .95)
  }
</style>