<template>
  <div>
    <div :class="`circle circle-${circleType}`"></div>
    <p class="description">{{circleType}} : 총 {{specLog[circleType]}}% 사용중</p>
  </div>
</template>

<script>
  import store from '../store'
  import {
    computed,
    onMounted,
  } from 'vue'
  import {
    circleWidth,
    circleHeight
  } from '../config'
  import * as d3 from 'd3'
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
      type: String,
      name: String
    },
    setup(props) {
      let svg, arc, foreground, textDOM
      const specLog = computed(() => store.getters['specLog'])
      const circleType = computed(() => props.type)

      const setAreaAndScale = (key) => {
        const radius = Math.min(circleWidth, circleHeight) / 2.5;
        svg = d3.select(`.circle-${key}`).append("svg")
          .attr("width", circleWidth)
          .attr("height", circleHeight)
          .append("g")
          .attr("transform", `translate(${circleWidth / 2},${circleWidth / 2})`)
        arc = d3.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius);
        svg.append("path")
          .data(pieGenerator([100]))
          .attr("class", "backColor")
          .attr("d", arc)
        foreground = svg.append("path")
          .data(pieGenerator([0, 100]))
          .attr("class", `frontColor-${circleType.value}`)
          .attr("d", arc)
        textDOM = svg.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", ".3em")
          .attr("font-size", "2em");
      }
      //draw에서는 데이터 처리가 아닌 data를 통해서 차트틀 그리는 것에 대해 집중해야 한다. 
      const draw = (data, key) => {
        data = data[key];
        foreground.transition()
          .duration(500)
          .attrTween("d", arcTween(pieGenerator([data, 100 - data]), arc, textDOM))
          .delay(1000)
      }
      onMounted(() => {
        setAreaAndScale(circleType.value);
        store.subscribe((mutation) => {
          if (mutation.type === "CHANGE_SPEC") {
            draw(specLog.value, circleType.value);
          }
        })
      })
      return {
        circleType,
        specLog
      }
    }
  }
</script>

<style>
  p.description {
    position: relative;
    bottom: 10px;
  }

  .backColor {
    stroke: #e2e2e2;
    fill: #e2e2e2;
  }

  .frontColor-cpuUsage {
    stroke: #69a9cd;
    fill: #69a9cd;

  }

  .frontColor-memUsage {
    stroke: #4fc08d;
    fill: #4fc08d;
  }
</style>