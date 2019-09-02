<template>
  <div :class="'Chart Chart-' + _key">
  </div>
</template>

<script>
  import config from '../config'
  import * as d3 from 'd3'
  const margin_value = 1;

  import {
    mapState
  } from 'vuex'
  export default {
    name: 'Chart',
    props: {
      _key: String,
      color: String
    },
    data() {
      return {
        svg: "",
        xScale: "",
        yScale: "",
        xAxis: "",
        yAxis: "",
        line: ""
      }
    },
    mounted() {
      this.setAreaAndScale(this._key);
      let cnt = 0;
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === "CHANGE_SENSOR_CHART") {
          if (!cnt) this.initDraw(this.sensors, this._key);
          else this.draw(this.sensors, this._key);
          cnt = 1; 
        }

      })
    },
    methods: {
      setAreaAndScale(key) {
        this.svg = d3.select(`.Chart-${key}`).append("svg")
          .attr("width", config.chartWidth + config.margin.left + config.margin.right)
          .attr("height", config.chartHeight + config.margin.top + config.margin.bottom)
          .append("g")
          .attr("transform", `translate(${config.margin.left},${config.margin.top})`)
        this.xScale = d3.scaleTime().range([0, config.chartWidth])
        this.yScale = d3.scaleLinear().range([config.chartHeight, 0])

        const timeFormat = d3.timeFormat("%H:%M")
        this.xAxis = d3.axisBottom(this.xScale).tickFormat(timeFormat)
        this.yAxis = d3.axisLeft(this.yScale)
        this.line = d3.line().x(d => this.xScale(d.time)).y(d => this.yScale(d[key])).curve(d3.curveMonotoneX)

      },
      initDraw(data, key) { 
        //data는 string형태로 오기 때문에 여기서 new Date 객체로 바꿔주어야 한다. 
        data.forEach(function (d) {
          d.time = new Date(d.time)
        });
        //scale에는 extent또는 0부터 max까지 할 수있다. 
        this.xScale.domain(d3.extent(data, d => d.time))
        //yScale.domain([0, d3.max(data, d => d.temp)])  
        const _min = d3.min(data, d => d[key])
        const _max = d3.max(data, d => d[key])
        this.yScale.domain([_min - margin_value, _max + margin_value])

        //data를 통해 path를 그리는데 3가지 방법이 있다. 
        // svg.append("path").datum(data).attr("d", line)
        // svg.append("path").data([data]).attr("d", line) 
        this.svg.append("path")
          .attr("d", this.line(data))
          .attr("class", "line")
        this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${config.chartHeight})`)
          .call(this.xAxis);

        this.svg.append("g")
          .attr("class", "y axis")
          .call(this.yAxis);
      },
      //draw에서는 데이터 처리가 아닌 data를 통해서 차트틀 그리는 것에 대해 집중해야 한다. 
      draw(data, key) { 
        data.forEach(function (d) {
          d.time = new Date(d.time)
        });
 
        const _min = d3.min(data, d => d[key])
        const _max = d3.max(data, d => d[key])
        this.xScale.domain(d3.extent(data, d => d.time)) 
        this.yScale.domain([_min - margin_value, _max + margin_value])
 
        var svg = d3.select(`.Chart-${key} svg`).transition();
        svg.select(".line")  
          .duration(750)
          .attr("d", this.line(data));
        svg.select(".x.axis")  
          .duration(750)
          .call(this.xAxis);
        svg.select(".y.axis")  
          .duration(750)
          .call(this.yAxis);
      }
    },
    computed: {
      ...mapState([
        'sensors'
      ])
    }
  }
</script>

<style>
  .Chart .line {
    fill: none;
    stroke: #f89e35;
    stroke-width: 2px;
  }
  .Chart-humi .line{ 
    stroke: #42b983; 
  } 
  .Chart-wv .line{ 
    stroke: #262d3d; 
  } 
  div.tooltip {
    position: absolute;
    text-align: center;
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    background: #f99e1a;
    border: 0px;
    border-radius: 8px;
  }

  .tooltip p {
    margin: 0;
    padding: 0;
  }

  circle {
    fill: rgba(40, 53, 79, .95);
  }
</style>