<template>
  <div>
    <div :class="`circle circle-${_key}`"></div> 
    <p>{{_key2}} : 총 {{specLog[_key]}}% 사용중</p>
  </div>
</template>

<script>
  import config from '../config'
  import * as d3 from 'd3'
  import {
    mapState
  } from 'vuex'
  const format = d3.format(".0%");

  const pieGenerator = d3.pie().sort(null)
  function arcTween(pie, arc, textDOM) { 
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

  export default {
    name: 'circleComponent',
    props: {
      _key: String,
      _key2: String,
      color: String
    },
    data() {
      return {
        svg: "",
        arc: "",
        foreground: "",
        textDOM: ""
      }
    },
    mounted() {
      this.setAreaAndScale(this._key); 
      this.$store.subscribe((mutation) => {
        if (mutation.type === "CHANGE_SPEC") {
          this.draw(this.specLog, this._key);
        }
      })
    },
    methods: {
      setAreaAndScale(key) {

        const radius = Math.min(config.circleWidth, config.circleHeight) / 2.5;
        this.svg = d3.select(`.circle-${key}`).append("svg")
          .attr("width", config.circleWidth)
          .attr("height", config.circleHeight)
          .append("g")
          .attr("transform", `translate(${config.circleWidth / 2},${config.circleWidth / 2})`)
        this.arc = d3.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius); 
        this.svg.append("path")
          .data(pieGenerator([100]))
          .attr("class", "backColor")
          .attr("d", this.arc)
        this.foreground = this.svg.append("path")
          .data(pieGenerator([0, 100]))
          .attr("class", `frontColor-${this._key}`)
          .attr("d", this.arc)
         this.textDOM = this.svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".3em")
            .attr("font-size", "2em");
      },
      //draw에서는 데이터 처리가 아닌 data를 통해서 차트틀 그리는 것에 대해 집중해야 한다. 
      draw(data, key) {
        data = data[key]; 
        this.foreground.transition().duration(500).attrTween("d", arcTween(pieGenerator([data, 100 - data]), this.arc, this.textDOM)).delay(1000)
      }
    },
    computed: {
      ...mapState([
        'specLog'
      ])
    }
  }
</script>

<style>
.backColor{
    stroke: #aaa; 
    fill: #aaa; 
}
.frontColor-cpuUsage{
    stroke: #69a9cd;
    fill: #69a9cd; 

}
.frontColor-memUsage{
    stroke:#4fc08d; 
    fill:#4fc08d; 
}  
</style>