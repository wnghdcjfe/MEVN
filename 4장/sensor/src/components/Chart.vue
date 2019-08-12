<template>
  <div class="Chart">

  </div>
</template>

<script>
  import config from '../config'
  import * as d3 from 'd3';
  import {
    mapState
  } from 'vuex'
  const _data = [{
      id: '402',
      time: '2019-08-02 01:05',
      temp: '25.8',
      wv: '1.2',
      humi: '89'
    },
    {
      id: '402',
      time: '2019-08-02 01:06',
      temp: '25.8',
      wv: '.9',
      humi: '88.9'
    },
    {
      id: '402',
      time: '2019-08-02 01:07',
      temp: '25.8',
      wv: '.9',
      humi: '89'
    },
    {
      id: '402',
      time: '2019-08-02 01:08',
      temp: '25.9',
      wv: '.5',
      humi: '88.9'
    },
    {
      id: '402',
      time: '2019-08-02 01:09',
      temp: '25.9',
      wv: '.6',
      humi: '88.8'
    },
    {
      id: '402',
      time: '2019-08-02 01:10',
      temp: '25.9',
      wv: '.4',
      humi: '88.7'
    },
    {
      id: '402',
      time: '2019-08-02 01:11',
      temp: '25.9',
      wv: '.7',
      humi: '88.6'
    },
    {
      id: '402',
      time: '2019-08-02 01:12',
      temp: '25.9',
      wv: '.6',
      humi: '88.7'
    },
    {
      id: '402',
      time: '2019-08-02 01:13',
      temp: '26',
      wv: '.5',
      humi: '88.6'
    },
    {
      id: '402',
      time: '2019-08-02 01:14',
      temp: '26',
      wv: '.5',
      humi: '88.4'
    },
    {
      id: '402',
      time: '2019-08-02 01:15',
      temp: '26',
      wv: '.6',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:16',
      temp: '26',
      wv: '.6',
      humi: '88.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:17',
      temp: '26',
      wv: '.3',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:18',
      temp: '25.9',
      wv: '0',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:19',
      temp: '25.9',
      wv: '0',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:20',
      temp: '25.9',
      wv: '0',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:21',
      temp: '26',
      wv: '0',
      humi: '88.3'
    },
    {
      id: '402',
      time: '2019-08-02 01:22',
      temp: '26',
      wv: '0',
      humi: '88.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:23',
      temp: '26',
      wv: '0',
      humi: '88.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:24',
      temp: '26',
      wv: '0',
      humi: '88.1'
    },
    {
      id: '402',
      time: '2019-08-02 01:25',
      temp: '26',
      wv: '0',
      humi: '88.1'
    },
    {
      id: '402',
      time: '2019-08-02 01:26',
      temp: '26',
      wv: '0',
      humi: '88.1'
    },
    {
      id: '402',
      time: '2019-08-02 01:27',
      temp: '26',
      wv: '0',
      humi: '88.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:28',
      temp: '26',
      wv: '0',
      humi: '88.1'
    },
    {
      id: '402',
      time: '2019-08-02 01:29',
      temp: '26',
      wv: '0',
      humi: '88.1'
    },
    {
      id: '402',
      time: '2019-08-02 01:30',
      temp: '25.9',
      wv: '.1',
      humi: '88.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:31',
      temp: '25.8',
      wv: '.9',
      humi: '88.4'
    },
    {
      id: '402',
      time: '2019-08-02 01:32',
      temp: '25.7',
      wv: '.8',
      humi: '88.7'
    },
    {
      id: '402',
      time: '2019-08-02 01:33',
      temp: '25.7',
      wv: '1.1',
      humi: '89'
    },
    {
      id: '402',
      time: '2019-08-02 01:34',
      temp: '25.6',
      wv: '.9',
      humi: '89.2'
    },
    {
      id: '402',
      time: '2019-08-02 01:35',
      temp: '25.6',
      wv: '1.3',
      humi: '89.4'
    },
    {
      id: '402',
      time: '2019-08-02 01:36',
      temp: '25.6',
      wv: '1.1',
      humi: '89.5'
    },
    {
      id: '402',
      time: '2019-08-02 01:37',
      temp: '25.5',
      wv: '1.2',
      humi: '89.7'
    },
    {
      id: '402',
      time: '2019-08-02 01:38',
      temp: '25.5',
      wv: '1.1',
      humi: '89.8'
    },
    {
      id: '402',
      time: '2019-08-02 01:39',
      temp: '25.5',
      wv: '1.3',
      humi: '89.9'
    },
    {
      id: '402',
      time: '2019-08-02 01:40',
      temp: '25.5',
      wv: '1',
      humi: '90.1'
    }
  ]
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
        console.log(config)
        const svg = d3.select(".Chart").append("svg")
          .attr("width", config.chartWidth + config.margin.left + config.margin.right)
          .attr("height", config.chartHeight + config.margin.top + config.margin.bottom)
          .append("g")
          .attr("transform", `translate(${config.margin.left},${config.margin.top})`);

        const data = _data

        data.forEach(function (d) {
          d.time = new Date(d.time)
        }); 

        const xScale = d3.scaleTime().range([0, config.chartWidth]).domain(d3.extent(data, d => d.time));
        const yScale = d3.scaleLinear().range([config.chartHeight, 0]).domain([0, d3.max(data, d => d.temp)]);

        //스케일 설정
        const line = key => d3.line().x(d => xScale(d.time)).y(d => yScale(d[key])).curve(d3.curveMonotoneX)
        //도메인 설정    
                svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${config.chartHeight})`)
          .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d")));

        svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale));

        svg.append("path")
          .data([data])
          .attr("class", "temp")
          .attr("d", line("temp"))
          .attr("class", "line")
        // add the Y Axis 

 
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
          
           var fixeddot = svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 5) 
            fixeddot.attr("cx", function (d) {
                    return xScale(d.time);
                })
                .attr("cy", function (d) {
                    return yScale(d.temp);
                })
                .on("mouseover", function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<p>툴팁</p>")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                });

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
  .Chart  .line {
    fill: none; 
    stroke: #f89e35;
    stroke-width: 2px;
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