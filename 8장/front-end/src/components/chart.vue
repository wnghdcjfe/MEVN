<template>
  <div :class="`Chart Chart-${_key}`">  
    <div class="tooltip"></div>
  </div> 
</template>

<script>
  import config from '../config'
  import * as d3 from 'd3'
  const margin_value = 1;
  const keyToHanguel = {
    "response-time": "응답시간"
  }
  const keyUnit = {
    "response-time": "ms"
  }

  const timeFormat = d3.timeFormat("%H:%M:%S")
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'Chart',
    props: {
      _key: String
    },
    data() {
      return {
        svg: "",
        xScale: "",
        yScale: "",
        xAxis: "",
        yAxis: "",
        line: "",
        tooltip: "",
        circle: "", 
        defs : null, 
        bgGradient : null, 
        area : null
      }
    },
    mounted() { 
      this.setAreaAndScale(this._key);
      let flag = 0;
      this.$store.subscribe((mutation) => {
        if (mutation.type === "CHANGE_RESPONSE_CHART") {    
            if (!flag) this.initDraw(this.resTimeList, this._key);
            else this.draw(this.resTimeList, this._key);
            flag = 1; 
        }
      })
    },
    methods: {
      setAreaAndScale(key) {
        this.svg = d3.select(`.Chart-${key}`).append("svg")
          .attr("width", config.chartWidth + config.margin.left + config.margin.right)
          .attr("height", config.chartHeight + config.margin.top + config.margin.bottom)
          .attr("class", "chartWrap")
          .append("g")
          .attr("transform", `translate(${config.margin.left},${config.margin.top})`) 

        this.xScale = d3.scaleTime().range([0, config.chartWidth])
        this.yScale = d3.scaleLinear().range([config.chartHeight, 0])

        this.xAxis = d3.axisBottom(this.xScale).tickFormat(timeFormat)
        this.yAxis = d3.axisLeft(this.yScale)
        this.line = d3.line().x(d => this.xScale(d.time)).y(d => this.yScale(d[key])).curve(d3.curveMonotoneX)
        this.line = d3.line().x(d => this.xScale(d.time)).y(d => this.yScale(d[key])).curve(d3.curveMonotoneX)


        this.area = d3.area().curve(d3.curveMonotoneX).x(d => this.xScale(d.time)).y0(config.chartHeight).y1(d => this.yScale(d[key]))
        this.tooltip = d3.select(`.tooltip`)
      },
      initDraw(data, key) {
        //data는 string형태로 오기 때문에 여기서 new Date 객체로 바꿔주어야 합니다.   
        data.forEach(d => d.time = new Date(d.time));
        const _min = d3.min(data, d => d[key])
        const _max = d3.max(data, d => d[key])

        //scale을 정합니다. yScale은 보기 좋게 margin 값을 적용합니다.
        this.xScale.domain(d3.extent(data, d => d.time)) 
        this.yScale.domain([_min - margin_value, _max + margin_value])   

        //x축과 y축을 설정합니다.  
        this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${config.chartHeight})`)
          .call(this.xAxis);
        this.svg.append("g")
          .attr("class", "y axis")
          .call(this.yAxis);

        // 그라데이션을 설정하기 위해 area
        this.svg.append("linearGradient")
          .attr("id", "temperature-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0).attr("y1", this.yScale(0))
          .attr("x2", 0).attr("y2", this.yScale(_max))
          .selectAll("stop")
          .data([
            {offset: "0%", color: "white"}, 
            {offset: "100%", color: "#4fc08d"}
          ])
          .enter().append("stop")
          .attr("offset", function(d) { return d.offset; })
          .attr("stop-color", function(d) { return d.color; }); 
        this.svg.append("path")
          .datum(data)  
          .attr("class", "area")
          .attr("d", this.area);
 
        this.circle = this.svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 3)
          .on("mouseover", d => { 
            this.tooltip.transition().duration(200).style("opacity", 1)
            const content = `<p>${keyToHanguel[key]}</p> <p>[${timeFormat(d.time)}]</p><h2>${d[key]}${keyUnit[key]}</h2>`
            this.tooltip.html(content).style("left", (d3.event.pageX - 92) + "px").style("top", (d3.event.pageY - 465)  + "px")
          })
          .on("mouseout", () => {
            this.tooltip.transition().duration(200).style("opacity", 0);
          }); 
        this.circle.attr("cx", d => this.xScale(d.time)).attr("cy", d => this.yScale(d[key])) 
 

      }, 
      draw(data, key) {
        data.forEach(d => d.time = new Date(d.time));
        const _min = d3.min(data, d => d[key])
        const _max = d3.max(data, d => d[key])
        this.xScale.domain(d3.extent(data, d => d.time))
        this.yScale.domain([_min - margin_value, _max + margin_value]) 

        this.svg.select(".area").transition().duration(750).attr("d", this.area(data))  
        
        this.svg.select(".x.axis")
          .transition()
          .duration(750)
          .call(this.xAxis);
        this.svg.select(".y.axis")
          .transition()
          .duration(750)
          .call(this.yAxis);
        this.circle
          .data(data)
          .transition()
          .duration(750)
          .attr("cx", d => this.xScale(d.time))
          .attr("cy", d => this.yScale(d[key]))
      }
    },
    computed: {
      ...mapState([
        'resTimeList'
      ])
    }
  }
</script>

<style>

.area {
  fill: url(#temperature-gradient); 
  fill-opacity : 0.4;
}
.chartWrap{
        border: 1px solid #dee3eb;
    background: #fff;

}
  .Chart {
    position: relative; 
  }

  .Chart .line {
    fill: none;
    stroke: #f89e35;
    stroke-width: 2px;
  }

  .Chart-humi .line {
    stroke: #42b983;
  }

  .Chart-wv .line {
    stroke: #262d3d;
  }

  circle {
    fill : #4fc08d;
  }
  
.tooltip {
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
  opacity:0;  
} 
.tooltip::after{ 
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
.tooltip h2{
  margin:0;  
  font-size:2rem;
}
.tooltip p {
  margin: 0;
  padding: 0; 
}
</style>