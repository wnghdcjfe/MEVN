<template>
  <div :class="`Chart Chart-${chartType}`">
    <div class="tooltip"></div>
  </div>
</template>
<script>
  import store from '../store'
  import {
    computed,
    onMounted
  } from 'vue'
  import {
    margin,
    chartWidth,
    chartHeight
  } from '../config'
  import * as d3 from 'd3'
  const timeFormat = d3.timeFormat("%H:%M:%S")
  export default {
    name: 'Chart',
    props: {
      type: String,
      name: String,
      unit: String
    },
    setup(props) {
      let svg, xScale, yScale, xAxis, yAxis, tooltip, circle, area

      const resTimeList = computed(() => store.getters['resTimeList'])
      const chartType = computed(() => props.type)
      const name = computed(() => props.name)
      const unit = computed(() => props.unit)
      const setAreaAndScale = (key) => {
        svg = d3.select(`.Chart-${key}`).append("svg")
          .attr("width", chartWidth + margin.left + margin.right)
          .attr("height", chartHeight + margin.top + margin.bottom)
          .attr("class", "chartWrap")
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)

        xScale = d3.scaleTime().range([0, chartWidth])
        yScale = d3.scaleLinear().range([chartHeight, 0])

        xAxis = d3.axisBottom(xScale).tickFormat(timeFormat)
        yAxis = d3.axisLeft(yScale)

        area = d3.area()
          .curve(d3.curveMonotoneX)
          .x(d => xScale(d.time))
          .y0(chartHeight)
          .y1(d => yScale(d[key]))
        tooltip = d3.select(`.tooltip`)
      }
      const initDraw = (data, key) => {
        //data는 string형태로 오기 때문에 여기서 new Date 객체로 바꿔주어야 합니다.   
        data.forEach(d => d.time = new Date(d.time));
        const mn = d3.min(data, d => d[key])
        const mx = d3.max(data, d => d[key])

        //scale을 정합니다. yScale은 보기 좋게 margin 값을 적용합니다.
        xScale.domain(d3.extent(data, d => d.time))
        yScale.domain([mn - margin.value, mx + margin.value])

        //x축과 y축을 설정합니다.  
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(xAxis);
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        // 그라데이션을 설정하기 위해 area
        svg.append("linearGradient")
          .attr("id", "response-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0).attr("y1", yScale(0))
          .attr("x2", 0).attr("y2", yScale(mx))
          .selectAll("stop")
          .data([{
              offset: "0%",
              color: "#eef9f4"
            },
            {
              offset: "100%",
              color: "#4fc08d"
            }
          ])
          .enter().append("stop")
          .attr("offset", function (d) {
            return d.offset;
          })
          .attr("stop-color", function (d) {
            return d.color;
          });
        svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);
        circle = svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 3)
          .on("mouseover", (event, d) => {
            const content = `<p>${name.value}</p> <p>[${timeFormat(d.time)}]</p><h2>${d[key]}${unit.value}</h2>`
            tooltip
              .html(content)
              .style("left", (event.pageX - 80) + "px")
              .style("top", (event.pageY - 452) + "px")
            tooltip.transition()
              .duration(200)
              .style("opacity", 1)
          })
          .on("mouseout", () => {
            tooltip.transition()
              .duration(200)
              .style("opacity", 0);
          });
        circle
          .attr("cx", d => xScale(d.time))
          .attr("cy", d => yScale(d[key]))


      }
      const draw = (data, key) => {
        data.forEach(d => d.time = new Date(d.time));
        const mn = d3.min(data, d => d[key])
        const mx = d3.max(data, d => d[key])
        xScale.domain(d3.extent(data, d => d.time))
        yScale.domain([mn - margin.value, mx + margin.value])

        svg.select(".area").transition().duration(750).attr("d", area(data))

        svg.select(".x.axis")
          .transition()
          .duration(750)
          .call(xAxis);
        svg.select(".y.axis")
          .transition()
          .duration(750)
          .call(yAxis);
        circle
          .data(data)
          .transition()
          .duration(750)
          .attr("cx", d => xScale(d.time))
          .attr("cy", d => yScale(d[key]))
      }
      onMounted(() => {
        setAreaAndScale(chartType.value);
        let flag = 0;
        store.subscribe((mutation) => {
          if (mutation.type === "CHANGE_RESPONSE_CHART") {
            if (!flag) initDraw(resTimeList.value, chartType.value);
            else draw(resTimeList.value, chartType.value);
            flag = 1;
          }
        })
      })
      return {
        chartType
      }
    }
  }
</script>

<style>
  .chartWrap {
    border: 1px solid #dee3eb;
    background: #fff;
  }

  .Chart,
  .Chart svg {
    position: relative;
  }

  circle {
    fill: #4fc08d;
  }

  .area {
    fill: url(#response-gradient);
    fill-opacity: 0.3;
  }

  .tooltip {
    z-index: 1;
    position: absolute;
    display: block;
    text-align: center;
    width: 150px;
    height: 100px;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    background: rgba(249, 158, 26, 0.7);
    border: 0px;
    border-radius: 8px;
    opacity: 0;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: 100%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(249, 158, 26, 0.7);
    clear: both;
  }

  .tooltip h2 {
    margin: 0;
    font-size: 2rem;
  }

  .tooltip p {
    margin: 0;
    padding: 0;
  }
</style>